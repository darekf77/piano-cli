//#region @backend
import { _ } from 'tnp-core/src';
import { EtcHosts, HostForServer } from 'vpn-split/src';

export const globalHost = {
  'test.me': HostForServer.From({
    ipOrDomain: '127.0.0.1',
    aliases: 'test.me' as any,
  }),
  'checkout.test': HostForServer.From({
    ipOrDomain: '127.0.0.1',
    aliases: 'checkout.test' as any,
  }),
  'localtest.me': HostForServer.From({
    ipOrDomain: '127.0.0.1',
    aliases: 'localtest.me' as any,
  }),
  'nexus.piano.io': HostForServer.From({
    ipOrDomain: '10.100.12.56', // '10.100.192.8',
    aliases: 'nexus.piano.io' as any,
  }),
} as EtcHosts;

export const allHosts: EtcHosts = {
  ...globalHost,
};

//#endregion

//#endregion
