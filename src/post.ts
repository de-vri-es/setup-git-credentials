import * as core from '@actions/core';
import { promises as fs } from 'fs';
import * as process from 'process';
import * as os from 'os';

function xdg_config_home() {
	const xdg_config_home = process.env['XDG_CONFIG_HOME'];
	if (xdg_config_home) return xdg_config_home;
	return `${os.homedir()}/.config`;
}

function non_empty_trimmed_lines(input: string): string[] {
	return input.split(/\r?\n/)
		.map(line => line.trim())
		.filter(line => line.length > 0);
}

async function cleanup() {
	try {
		const addedCredentials = core.getState('added-credentials');
		if (!addedCredentials) {
			core.info('No credentials were added to clean up');
			return;
		}

		const credentialsToRemove = JSON.parse(addedCredentials) as string[];
		if (credentialsToRemove.length === 0) {
			core.info('No credentials to remove');
			return;
		}

		const credentialsPath = `${xdg_config_home()}/git/credentials`;
		
		// Check if the credentials file exists
		try {
			await fs.access(credentialsPath);
		} catch {
			core.info('Credentials file does not exist, nothing to clean up');
			return;
		}

		// Read the current file contents
		const contents = (await fs.readFile(credentialsPath)).toString();
		const currentLines = non_empty_trimmed_lines(contents);
		
		// Remove the credentials that were added by this action
		const filteredLines = currentLines.filter(line => !credentialsToRemove.includes(line));
		
		// Write back the filtered content
		if (filteredLines.length > 0) {
			await fs.writeFile(credentialsPath, filteredLines.join('\n') + '\n', { mode: 0o600 });
			core.info(`Removed ${credentialsToRemove.length} credential(s) from git credentials file`);
		} else {
			// If no credentials remain, remove the file
			await fs.unlink(credentialsPath);
			core.info('Removed empty git credentials file');
		}
		
		core.info('Git credentials cleanup completed');
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		core.warning(`Failed to clean up git credentials: ${errorMessage}`);
	}
}

cleanup();
