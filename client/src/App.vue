<template>
  <div>
    <h1>
      Hello,
      <ww-open-data
        v-if="userId"
        type="userName"
        :openid="userId"
      />
    </h1>
    <button
      v-if="showSelector"
      @click="onSelectContact"
    >
      选择联系人
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, nextTick } from 'vue';
import * as ww from '@wecom/jssdk';

import { isWechat } from './lib/env';
import { useLogin } from './lib/login';
import { useJSAPI } from './lib/jsapi';
import { useAuth, useCloudBase } from './lib/cloudbase';

export default defineComponent({

  setup() {
    const userId = ref<string>();

    const login = useLogin();
    const jsapi = useJSAPI();

    onMounted(async () => {
      const userInfo = await login.checkLogin();
      if (!userInfo) {
        return;
      }

      if (history.replaceState) {
        history.replaceState(null, '', '/');
      } else {
        location.replace('/');
      }
      userId.value = userInfo.userId;

      // FIXME: remove in production environment
      if (isWechat) {
        await jsapi.inspectJSBridge();
      }

      jsapi.registerWecomApp(userInfo);
      await jsapi.initWwOpenData();
    });

    async function onSelectContact() {
      const res = await ww.selectEnterpriseContact({
        fromDepartmentId: -1,
        mode: 'single',
        type: ['user'],
        selectedUserIds: [userId.value!],
      });

      const newUserId = res.result.userList[0]?.id;
      if (!newUserId) {
        return;
      }

      userId.value = newUserId;
      await nextTick();

      const { WWOpenData } = window as any;
      WWOpenData.bindAll(document.querySelectorAll('ww-open-data'));
    }

    return {
      userId,
      showSelector: isWechat,
      onSelectContact,
    };
  },
});
</script>
