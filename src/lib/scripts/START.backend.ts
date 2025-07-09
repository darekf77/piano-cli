import { _ } from 'tnp-core/src';
import { BaseCommandLineFeature, Helpers } from 'tnp-helpers/src';

import { ProjectPiano } from '../project';

export class $Start extends BaseCommandLineFeature<{}, ProjectPiano> {
  async _() {
    await this.project.start();
  }

  async clean() {
    await this.project.nodeModules.reinstall();
    await this._();
  }
}

export default {
  $Start: Helpers.CLIWRAP($Start, '$Start'),
};
