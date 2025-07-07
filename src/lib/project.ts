import { BaseProject } from 'tnp-helpers/src';

import { ProjectResolver } from './project-resolver';

export class ProjectPiano extends BaseProject<ProjectPiano> {
  //#region static

  static ins = new ProjectResolver(ProjectPiano, 'piano');
  public get ins(): ProjectResolver {
    return ProjectPiano.ins;
  }
}
