import * as qs from 'querystring';

import { useAuth } from './cloudbase';
import { isWechat, useEnv } from './env';
import { useTCB } from './tcb';

export function useLogin() {
  const auth = useAuth()!;
  const tcb = useTCB();
  const env = useEnv()!;

  async function checkLogin() {
    const loginUserInfo = await getLoginUserInfo();
    if (loginUserInfo) {
      return loginUserInfo;
    }

    const params = new URLSearchParams(location.search);
    if (!params.get('code') && !params.get('auth_code')) {
      redirectOAuth();
      return;
    }

    let userInfo;
    if (params.get('auth_code')) {
      userInfo = await tcb.call('login-with-qrcode-oauth', { code: params.get('auth_code') });
    } else {
      userInfo = await tcb.call('login-with-redirect-oauth', { code: params.get('code') });
    }

    if (!auth) {
      throw new Error('CloudBase not initialized');
    }
    await auth.customAuthProvider().signIn(userInfo.ticket);

    return userInfo;
  }

  /**
   * 获取已登录用户信息
   */
  async function getLoginUserInfo() {
    const loginState = await auth.getLoginState();
    if (!loginState) {
      return;
    }

    try {
      return await tcb.call('get-user-info', {
        customUserId: loginState.user.customUserId,
      });
    } catch (error) {
      console.error('Get user info failed', error);
      await auth.signOut();
    }
  }

  /**
   * 重定向到登录 URL
   */
  function redirectOAuth() {
    if (!isWechat) {
      const params = qs.stringify({
        appid: env.PROVIDER_ID,
        redirect_uri: location.href,
        state: 'desktop',
        usertype: 'admin',
      });
      location.href = `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?${params}`;
      return;
    }

    const params = qs.stringify({
      appid: env.SUITE_ID,
      redirect_uri: location.href,
      response_type: 'code',
      scope: 'snsapi_base',
      state: 'mobile',
    });
    location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?${params}#wechat_redirect`);
  }

  return {
    checkLogin,
  };
}
