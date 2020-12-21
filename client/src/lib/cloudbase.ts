import { App, inject } from 'vue';
import cloudbase from '@cloudbase/js-sdk';

export const CloudBaseAppSymbol = Symbol('CloudBaseApp');
export const CloudBaseAuthSymbol = Symbol('CloudBaseAuth');

export interface ICloudbaseAuthConfig {
  persistence: cloudbase.auth.Persistence;
}

export default (tcbOptions: cloudbase.ICloudbaseConfig, authOptions: ICloudbaseAuthConfig) => ({

  install: (app: App) => {
    const tcb = cloudbase.init(tcbOptions);
    app.provide(CloudBaseAppSymbol, tcb);
    app.provide(CloudBaseAuthSymbol, tcb.auth(authOptions));
  },
});

export function useCloudBase() {
  return inject<cloudbase.app.App>(CloudBaseAppSymbol);
}

export function useAuth() {
  return inject<cloudbase.auth.App>(CloudBaseAuthSymbol);
}
