# login-with-qrcode-oauth

消费 [网页授权登录](https://open.work.weixin.qq.com/api/doc/90001/90143/91119) 返回的授权码获取用户信息，同时使用 openUserId 作为 customUserID 生成云开发自定义登录 ticket。

## Usage

```js
const res = await app.callFunction({
  name: 'login-with-qrcode-oauth',
  data: {
    /** 网页授权 OAuth code */
    code: query.code
  }
})
```

## 返回值

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| openUserId | string | 对服务商全局唯一的用户 ID |
| corpId | string | 授权企业 ID |
| userId | string | 用户在授权企业内的 ID |
| agentId | number | 第三方应用在授权企业内的应用 ID |
| ticket | string | 云开发自定义登录 ticket |
