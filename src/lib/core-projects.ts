import { CoreAngularProject, CoreProject, Helpers } from 'tnp-helpers/src';

import type { ProjectPiano } from './project';

const corePorjectsMap = new Map<string, CoreProject>();

//#region piano dc
corePorjectsMap.set(
  'piano-dc',
  CoreProject.from<ProjectPiano>({
    branches: ['master'],
    color: '#522279',
    urlHttp: 'https://gitlab.com/piano/common/piano-dc.git',
    recognizedFn: proj => proj.name === 'piano-dc',
    description: `Piano component library`,
    environments: [
      {
        shortName: 'dev',
        name: 'Development environment',
        description: 'Anything allowed here - for development purposes',
        onlineLink: 'https://piano-dc-dev.piano.io',
      },
      {
        shortName: 'test',
        name: 'Test environment',
        description: 'Only for QA purposes',
        onlineLink: 'https://piano-dc-test.piano.io',
      },
    ],
  }),
);
//#endregion

//#region piano-payout-demo-widget
corePorjectsMap.set(
  'piano-payout-demo-widget',
  CoreProject.from<ProjectPiano>({
    branches: ['master'],
    color: '#122279',
    urlHttp: 'https://gitlab.com/darekf77piano/piano-payout-demo-widget.git',
    recognizedFn: proj => proj.name === 'piano-payout-demo-widget',
    description: `Piano payout demo widget`,
  }),
);
//#endregion

//#region ostap-funds
corePorjectsMap.set(
  'ostap-funds',
  CoreProject.from<ProjectPiano>({
    branches: ['main'],
    color: '#222279',
    urlHttp: 'https://gitlab.com/piano/vx/ostap-funds.git',
    recognizedFn: proj =>
      proj
        .readFile('settings.gradle.kts')
        ?.includes(`rootProject.name = "ostap-funds"`),
    description: `Ostap funds`,
    startCommand: async ({ project }) => {
      project
        .run(`./gradlew bootRun --args='--spring.profiles.active=local'`)
        .sync();
    },
  }),
);
//#endregion

//#region piano-vx
corePorjectsMap.set(
  'piano-vx',
  CoreProject.from<ProjectPiano>({
    branches: ['master'],
    color: '#222279',
    urlHttp: 'https://gitlab.com/piano/vx/piano-vx.git',
    recognizedFn: proj =>
      proj?.ins?.From(proj?.pathFor('website'))?.name ===
      'piano-vx-website-frontend',
    description: `Piano vx`,
    buildCommand: async () => {
      //
      // choco install corretto21jdk
      // choco install tomcat
      // choco install openssl
      // choco install mkcert
      // choco install gradle
      // gradle.properties
      // systemProp.gradle.enterprise.allowUntrustedServer=true
      //       # setup your local properties, remember to turn on the VPN
      // ./gradlew applyPatch
      // ./gradlew initComposeEnvironment
      // # start MySQL and Redis, etc.
      // ./gradlew developComposeUp
      // # apply DB migrations scripts
    },
  }),
);

export { corePorjectsMap };
