import { config } from 'tnp-config/src';
import { crossPlatformPath, fse, path, _ } from 'tnp-core/src';
import {
  Helpers,
  BaseProject,
  BaseProjectResolver,
  CoreProject,
  CoreCommandArgOptions,
  LibrariesBuildOptions,
  BaseLibraryBuild,
} from 'tnp-helpers/src';

import { ProjectType } from './models';
import type { ProjectPiano } from './project';

export class ProjectResolver extends BaseProjectResolver<ProjectPiano> {
  typeFrom(location: string, recrusiveCall = false): ProjectType {
    //#region @backendFunc

    if (recrusiveCall) {
      return;
    }

    if (
      Helpers.exists([location, 'pom.xml']) ||
      Helpers.exists([location, 'build.gradle']) ||
      Helpers.exists([location, 'gradlew'])
    ) {
      return 'java-backend';
    }

    // const parentPath = this.parentPathChild(location);
    // const parentType = this.typeFrom(parentPath, true);

    // if (parentType === 'angular') {
    //   return 'angular-lib';
    // }
    if (Helpers.exists([location, config.file.angular_json])) {
      return 'angular';
    }

    if (Helpers.exists([location, config.file.tsconfig_json])) {
      return 'typescript';
    }

    if (Helpers.exists([location, config.file.package_json])) {
      return 'unknown-npm-project';
    }
    // #endregion
  }

  From(locationOfProject: string | string[]): ProjectPiano | undefined {
    //#region @websqlFunc
    if (Array.isArray(locationOfProject)) {
      locationOfProject = locationOfProject.join('/');
    }
    let location = crossPlatformPath(locationOfProject.replace(/\/\//g, '/'));

    if (!_.isString(location)) {
      Helpers.warn(`[project.from] location is not a string`);
      return;
    }
    if (path.basename(location) === 'dist') {
      location = path.dirname(location);
    }
    location = crossPlatformPath(path.resolve(location));

    const alreadyExist = this.projects.find(
      l => l.location.trim() === location.trim(),
    );
    if (alreadyExist) {
      return alreadyExist as any;
    }

    //#region @backend
    if (!fse.existsSync(location)) {
      Helpers.log(
        `[taon-helpers][project.from] Cannot find project in location: ${location}`,
        1,
      );
      this.emptyLocations.push(location);
      return;
    }

    let type = this.typeFrom(location);
    if (type) {
      let resultProject = new this.classFn(location) as BaseProject;
      const pj = Helpers.readJson(
        crossPlatformPath([location, config.file.package_json]),
      );

      // @ts-ignore
      resultProject.type = type;
      // @ts-ignore
      resultProject.packageJSON = pj;
      return resultProject as any;
    }
    //#endregion

    //#endregion
  }
}
