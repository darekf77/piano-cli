import type { EnvOptions } from 'tnp/src';
import baseEnv from '../../env';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  release: {
    cli: {
      includeNodeModules: true,
    },
    lib: {
      doNotIncludeLibFiles: true,
    },
  },
};
export default env;
