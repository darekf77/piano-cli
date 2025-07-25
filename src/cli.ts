import { _, path, glob, chalk } from 'tnp-core/src';
import { BaseStartConfig, Helpers } from 'tnp-helpers/src';

import { ProjectPiano } from './lib/project';
import cliCommands from './lib/scripts/index';

/**
 * Recognize argument and run script
 * @param argsv
 */
export async function run(argsv: string[]) {
  new BaseStartConfig({
    ProjectClass: ProjectPiano,
    functionsOrClasses: BaseStartConfig.prepareArgs(cliCommands),
    argsv,
    useStringArrForArgsFunctions: true,
    shortArgsReplaceConfig: {
      b: 'build',
      bw: 'build:watch',
      s: 'start',
    },
    callbackNotRecognizedCommand: async ({
      runGlobalCommandByName,
      firstArg,
    }) => {
      // if (firstArg) {
      //   Helpers.warn(`Command not recognized. Checking if any projects can be open with ${firstArg}`);
      //   runGlobalCommandByName('open');
      // } else {
      Helpers.error(
        `Command not recognized. Please run:

      piano help


      `,
        false,
        true,
      );
      // }
    },
  });
}
