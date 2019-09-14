import * as core from '@actions/core';
import { exec } from '@actions/exec';

import { promises as fs } from 'fs';
import * as process from 'process';
import * as os from 'os';

function xdg_config_home() {
	const xdg_config_home = process.env['XGD_CONFIG_HOME'];
	if (xdg_config_home) return xdg_config_home;
	return `${os.homedir()}/.config`
}

async function run() {
	const secret = core.getInput('secret');
	const credentials = process.env[secret];
	if (!credentials) {
		throw new Error(`Credentials environment variable '${secret}' is not set`);
	}

	// Write credentials.
	await fs.mkdir(`${xdg_config_home()}/git`, { recursive: true });
	await fs.writeFile(`${xdg_config_home()}/git/credentials`, credentials, { flag: 'a', mode: 0o600 });

	// Add git configuration.
	await exec('git', ['config', '--global', 'credential.helper', 'store']);
	await exec('git', ['config', '--global',          'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
	await exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
}

run().catch(error => {
	core.setFailed(error.message);
});
