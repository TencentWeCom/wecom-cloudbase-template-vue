declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  _tcbEnv: {
    ENV_ID: string
    PROVIDER_ID: string
    SUITE_ID: string
    TCB_ENV_ID: string
    TCB_REGION: string
    TCB_SERVICE_DOMAIN: string
  };
}
