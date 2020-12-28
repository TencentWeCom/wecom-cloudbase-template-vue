import { createApp } from 'vue';
import VConsole from 'vconsole';

import App from './App.vue';
import cloudbase from './lib/cloudbase';
import { isWechat, provideEnv } from './lib/env';

// FIXME: remove in production environment
if (isWechat) {
  new VConsole();
}

init().catch(console.error);

async function init() {
  const env = await fetch('/cloudbaseenv.json')
    .then(res => res.json());

  createApp(App)
    .use(provideEnv(env))
    .use(cloudbase({ env: env.ENV_ID }, { persistence: 'local' }))
    .mount('#app');
}
