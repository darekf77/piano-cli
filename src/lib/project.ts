import { BaseProject, Helpers } from 'tnp-helpers/src';

import { Git } from './git';
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
    this.git = new (require('./git').Git as typeof Git)(this as any);
  }
  //#endregion

  async start() {
    if (this.hasFile('index.html')) {
      const freePort = await this.assignFreePort(8080);
      Helpers.info(`Starting project on port http://localhost:${freePort}`);
      this.run(`npx http-server -p ${freePort}`).sync();
    } else {
      Helpers.error(
        `Start command not implemented for project ${this.name}`,
      );
    }
  }
}
