import * as core from '@actions/core';
import { exec } from '@actions/exec';

import { promises as fs } from 'fs';
import * as process from 'process';
import * as os from 'os';

function xdg_config_home() {
	const xdg_config_home = process.env['XDG_CONFIG_HOME'];
	if (xdg_config_home) return xdg_config_home;
	return `${os.homedir()}/.config`
}

function non_empty_trimmed_lines(input: string): string[] {
	return input.split(/\r?\n/)
		.map(line => line.trim())
		.filter(line => line.length > 0);
}

async function run() {
	const credentials = non_empty_trimmed_lines(core.getInput('credentials', { required: true }));

	// Get the current credentials so we can avoid adding duplicates.
	// On self-hosted runners, the credentials file could be retained between runs, so we don't want to add duplicates.
	await fs.mkdir(`${xdg_config_home()}/git`, { recursive: true });
	const file = await fs.open(`${xdg_config_home()}/git/credentials`, "a+", 0o600);
	const old_credentials = non_empty_trimmed_lines((await file.readFile()).toString());
	const new_credentials = credentials.filter(entry => !old_credentials.includes(entry));

	// Replace the entire file, so it doesn't matter if it ended with a newline before.
	file.truncate(0);
	for (const credential of old_credentials) {
		await file.write(credential + "\n");
	}
	for (const credential of new_credentials) {
		await file.write(credential + "\n");
	}

	// Add git configuration.
	await exec('git', ['config', '--global', 'credential.helper', 'store']);
	await exec('git', ['config', '--global', '--replace-all', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
	await exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
}

run().catch(error => {
	core.setFailed(error.message);
});
