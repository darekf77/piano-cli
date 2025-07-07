import { BaseProject } from 'tnp-helpers/src';

import { ProjectResolver } from './project-resolver';
import type { Vscode } from './vscode';

export class ProjectPiano extends BaseProject<ProjectPiano> {
  //#region static

  static ins = new ProjectResolver(ProjectPiano, 'piano');
  public get ins(): ProjectResolver {
    return ProjectPiano.ins;
  }
  //#region @backend
  constructor(location: string) {
    super(location);

    this.vsCodeHelpers = new (require('./vscode').Vscode as typeof Vscode)(
      this,
    );
  }
  //#endregion
}
