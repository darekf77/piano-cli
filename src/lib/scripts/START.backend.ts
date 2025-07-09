import { _, UtilsTerminal } from 'tnp-core/src';
import { BaseCommandLineFeature, Helpers } from 'tnp-helpers/src';

import { ProjectPiano } from '../project';

export class $Start extends BaseCommandLineFeature<{}, ProjectPiano> {
  async _() {
    await this.project.start();
  }

  async demo() {
    UtilsTerminal.clearConsole();
    const envirnment = await UtilsTerminal.select({
      question: 'Select environment to start',
      choices: [
        { name: 'Development', value: 'dev' },
        { name: 'Production', value: 'prod' },
        { name: 'Test', value: 'test' },
      ],
    });
    const artifacts = await UtilsTerminal.multiselect({
      question: 'Select artifacts to build',
      choices: [
        { name: 'Frontend', value: 'frontend' },
        { name: 'Backend', value: 'backend' },
        { name: 'Database', value: 'database' },
      ],
    });
    const enableDocker = await UtilsTerminal.confirm({
      message: 'Enable Docker?',
      defaultValue: false,
    });

    const ora = require('ora');
    const spinner = ora();
    spinner.text =
      `Starting project in ${envirnment} ` +
      `mode with artifacts: ${artifacts.join(
        ', ',
      )}${enableDocker ? ' using Docker' : '(without Docker)'}`;
    spinner.start();
    await UtilsTerminal.wait(2);
    spinner.text = 'Building project...';
    await UtilsTerminal.wait(20);
    this._exit()
  }

  async clean() {
    await this.project.nodeModules.reinstall();
    await this._();
  }
}

export default {
  $Start: Helpers.CLIWRAP($Start, '$Start'),
};
