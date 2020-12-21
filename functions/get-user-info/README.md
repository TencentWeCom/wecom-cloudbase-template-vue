# get-user-info

获取当前云开发自定义登录的用户信息。

## Usage

```js
const res = await app.callFunction({
  name: 'get-user-info'
})
```

## 返回值

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| openUserId | string | 对服务商全局唯一的用户 ID |
| corpId | string | 授权企业 ID |
| userId | string | 用户在授权企业内的 ID |
| agentId | number | 第三方应用在授权企业内的应用 ID |
