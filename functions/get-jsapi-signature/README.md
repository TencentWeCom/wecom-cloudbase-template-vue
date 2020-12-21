# get-jsapi-signature

生成 jsapi 签名。

## Usage

```js
const res = await app.callFunction({
  name: 'get-jsapi-signature',
  data: {
    /** 生成 jsapi 签名的 URL，不包含 hash 部分 */
    url: signatureURL,
    /** jsapi 签名类型，为 'corp' 或 'agent' */
    type: 'corp'
  }
})
```

## 返回值

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| timestamp | number | 生成签名的时间戳 |
| nonceStr | string | 生成签名的随机串 |
| signature | string | jsapi 签名 |
