//#region imports
import { config } from 'tnp-config/src';
import { chalk, fse, json5, path, _, os } from 'tnp-core/src';
import { Utils } from 'tnp-core/src';
import { crossPlatformPath } from 'tnp-core/src';
import { BaseVscodeHelpers, Helpers, UtilsVSCode } from 'tnp-helpers/src';

import type { ProjectPiano } from './project';
//#endregion

/**
 * Handle taon things related to vscode
 * support for launch.json, settings.json etc
 */
export class Vscode // @ts-ignore TODO weird inheritance problem
  extends BaseVscodeHelpers<Project>
{
  getExtensions(): string[] {
    const extensions: string[] = super.getExtensions();

    return [
      ...extensions,
      'pheianox.solidjs-snippets',
      'solidjs-community.solid-snippets',
    ];
  }
}
