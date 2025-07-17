//#region imports
import { path } from 'tnp-core/src';
import { chalk, crossPlatformPath } from 'tnp-core/src';
import { Helpers, BaseGlobalCommandLine, CoreProject } from 'tnp-helpers/src';
import { corePorjectsMap } from '../core-projects';
import { ProjectPiano } from '../project';
//#endregion

/**
 * override/create global commands
 */
class $Global extends BaseGlobalCommandLine<{}, ProjectPiano> {
  public _() {
    Helpers.error('Please select proper command.', false, true);
    this._exit();
  }

  test() {
    Helpers.warn('This is a test command. It does nothing.');
    this._exit();
  }

  coreProjects() {
    Helpers.info('Available core projects:');
    corePorjectsMap.values();
    CoreProject.coreProjects.forEach(project => {
      console.log(project.name);
    });
    this._exit();
  }
}

export default {
  // registerd as empty
  $Global: Helpers.CLIWRAP($Global, ''),
};
