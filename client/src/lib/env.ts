import { App, inject } from 'vue';

export const ua = navigator.userAgent;

export const isMobile = /mobile/i.test(ua);

export const isWechat = /micromessenger/i.test(ua);

export const EnvSymbol = Symbol('Env');

export const tcbEnv = window._tcbEnv;

export const provideEnv = (env: typeof tcbEnv) => ({
  install: (app: App) => {
    app.provide(EnvSymbol, env);
  },
});

export function useEnv() {
  return inject<typeof tcbEnv>(EnvSymbol);
}
