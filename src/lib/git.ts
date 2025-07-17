import { config } from 'tnp-config/src';
import { chalk, path } from 'tnp-core/src';
import { BaseGit, Helpers } from 'tnp-helpers/src';

import type { ProjectPiano } from './project';

export class Git extends BaseGit<ProjectPiano> {
  allowedGitEmailDomains(): string[] {
    return ['piano.io'];
  }
}
