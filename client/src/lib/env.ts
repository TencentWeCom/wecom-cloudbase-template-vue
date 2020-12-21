import { App, inject } from 'vue';

export const ua = navigator.userAgent;

export const isMobile = /mobile/i.test(ua);

export const isWechat = /micromessenger/i.test(ua);

export const EnvSymbol = Symbol('Env');

export interface Env {
  ENV_ID: string;
  PROVIDER_ID: string;
  SUITE_ID: string;
}

export const provideEnv = (env: Env) => ({

  install: (app: App) => {
    app.provide(EnvSymbol, env);
  },
});

export function useEnv() {
  return inject<Env>(EnvSymbol);
}
