import { createApp } from 'vue';
import VConsole from 'vconsole';

import App from './App.vue';
import cloudbase from './lib/cloudbase';
import { isWechat, provideEnv, tcbEnv } from './lib/env';

// FIXME: remove in production environment
if (isWechat) {
  new VConsole();
}

createApp(App)
  .use(provideEnv(tcbEnv))
  .use(cloudbase({ env: tcbEnv.ENV_ID }, { persistence: 'local' }))
  .mount('#app');
