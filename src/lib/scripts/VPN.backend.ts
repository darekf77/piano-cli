import * as _ from 'lodash';
import { HOST_FILE_PATH } from 'tnp-config/src';
import { path } from 'tnp-core/src';
import { Helpers } from 'tnp-helpers/src';
import { VpnSplit } from 'vpn-split/src';

import { allHosts } from '../piano-hosts';

async function VPN(args: string[]) {
  const { local }: { local: boolean } = require('minimist')(args);
  const saveHostInUserFolder = !!local;
  // console.log({
  //   saveHostInUserFolder
  // })
  //#region igt hosts

  //#endregion
  //#region  host from projects

  const ins = await VpnSplit.Instance({
    ports: [
      80, 443, 4443, 22, 2222, 8180, 8080, 4407, 9443,
      // 11020,
      // 11140,
      // 11040,
      // 11120,
      // 11090,
      // 11110,
      // 11100,
      // 11050, // should be 11050
      // 11030,
      // // 11020,
      // 11010,
      // 11000,
      // // unused yet
      // 11060,
      // 11070,
      // 11080,
    ],
    additionalDefaultHosts: allHosts,
    allowNotSudo: !!saveHostInUserFolder,
  });
  if (args.join(' ').trim() === '') {
    // @ts-ignore
    await ins.startServer(saveHostInUserFolder);
  } else {
    // @ts-ignore
    await ins.startClient(Helpers.urlParse(args.shift()), saveHostInUserFolder);
  }
  process.stdin.resume();
}

function OPEN_HOSTS() {
  Helpers.openFolderInFileExplorer(path.dirname(HOST_FILE_PATH));
  process.exit(0);
}

/**
 * @deprecated
 */
async function APPLY_HOSTS() {
  const ins = await VpnSplit.Instance();
  await ins.applyHosts(allHosts);
  process.exit(0);
}

/**
 * @deprecated
 */
async function APPLY_HOSTS_LOCAL() {
  const ins = await VpnSplit.Instance();
  await ins.applyHostsLocal(allHosts);
  process.exit(0);
}

export default {
  APPLY_HOSTS,
  APPLY_HOSTS_LOCAL,
  VPN,
  OPEN_ETC_HOSTS() {
    OPEN_HOSTS();
  },
  OPEN_HOSTS,
};
