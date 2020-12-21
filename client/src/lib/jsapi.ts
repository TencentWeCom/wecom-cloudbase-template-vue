import * as ww from '@wecom/jssdk';
import { useTCB } from './tcb';

export function useJSAPI() {
  const tcb = useTCB();

  async function inspectJSBridge() {
    await ww.onWeixinJSBridgeReady;

    const { WeixinJSBridge } = window as any;
    const originalInvoke = WeixinJSBridge.invoke;

    WeixinJSBridge.invoke = function invoke(type: string, params: any, callback: Function) {
      const startTime = Date.now();
      console.log('->', type, params);

      return originalInvoke.call(this, type, params, function (this: any, res: any) {
        console.log('<-', type, `[${Date.now() - startTime}ms]`, res);
        return callback.call(this, res);
      });
    };
  }

  function registerWecomApp(userInfo: any) {
    ww.register({
      corpId: userInfo.corpId,
      agentId: userInfo.agentId,
      jsApiList: [
        'selectEnterpriseContact',
      ],
      getConfigSignature(url) {
        return tcb.call('get-jsapi-signature', { url, type: 'corp' });
      },
      getAgentConfigSignature(url) {
        return tcb.call('get-jsapi-signature', { url, type: 'agent' });
      },
    });
  }

  async function initWwOpenData() {
    await ww.initOpenData();

    const { WWOpenData } = window as any;
    WWOpenData.bindAll(document.querySelectorAll('ww-open-data'));
  }

  return {
    inspectJSBridge,
    registerWecomApp,
    initWwOpenData,
  };
}
