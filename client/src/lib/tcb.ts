import { useCloudBase } from './cloudbase';

export function useTCB() {
  const app = useCloudBase()!

  async function call(name: string, data: any) {
    const startTime = Date.now();
    console.log('=>', name, data);

    const res = await app.callFunction({ name, data });
    console.log('<=', name, `[${Date.now() - startTime}ms]`, res);

    return res.result;
  }

  return {
    call,
  };
}
