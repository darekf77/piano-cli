import type { EnvOptions } from 'tnp/src';
import baseEnv from './env.npm-lib-and-cli-tool.__';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  release: {
    cli: {
      includeNodeModules: true,
      minify: true,
    },
    lib: {
      doNotIncludeLibFiles: true,
    },
  },
};
export default env;
