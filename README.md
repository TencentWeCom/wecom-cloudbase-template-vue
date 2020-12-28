# 企业微信第三方应用示例

__注意：该项目处于开发调试阶段，请勿在线上环境中使用__

该项目是基于云开发的一个企业微信第三方应用示例，包含云函数 + 静态网站部署，可以基于 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 框架将项目一键部署到云开发环境

[![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2FTencentWecom%2Fwecom-cloudbase-template-vue&branch=master)

## 使用说明

### 1. 创建云开发环境

点击 [这里](https://console.cloud.tencent.com/tcb/env/index?action=CreateEnv) 创建一个「按量计费」的云开发环境，在环境创建完成后：

- 在「[静态网站托管](https://console.cloud.tencent.com/tcb/hosting)」记录下默认域名，作为应用的「静态域名」
- 在「[环境 / HTTP访问服务](https://console.cloud.tencent.com/tcb/env/access)」记录下默认域名，作为应用的「服务域名」
- 在「[环境 / 登录授权](https://console.cloud.tencent.com/tcb/env/login)」下载自定义登录私钥，取出其中的 private_key_id 和 private_key

### 2. 创建网页应用

点击 [这里](https://open.work.weixin.qq.com/wwopen/developer#/sass/apps/create) 创建一个第三方应用，其中：

- __应用主页__ 填入「静态域名」的首页 URL（可以配置为对应的[网页授权链接](https://open.work.weixin.qq.com/api/doc/90001/90143/91120)）
- __可信域名__ 填入「静态域名」
- __安装完成回调域名__ 填入「静态域名」
- __业务设置URL__ 填入「静态域名」的首页 URL
- __数据回调URL__ 填入「服务域名」下的 `/ww-callback` 路径
- __指令回调URL__ 填入「服务域名」下的 `/ww-callback` 路径

> 例：「服务域名」为 `example.com`，则回调 URL 填入 `https://example.com/ww-callback`

### 3. 部署第三方应用模板

点击 [这里](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2FTencentWecom%2Fwecom-cloudbase-template-vue&branch=master) 开始部署第三方应用：

- 环境选择步骤 1 中创建的环境
- 服务商 CorpID、ProviderSecret 在「[服务商后台 / 应用管理 / 通用开发参数](https://open.work.weixin.qq.com/wwopen/developer#/sass/power/inter)」页面获取
- Token、EncodingAESKey 填创建应用时填入的 Token、EncodingAESKey，可在应用详情页面查看
- Suite ID、Suite Secret 可在应用详情页面获取
- 自定义登录私钥填入步骤 1 中获取的私钥信息，注意需要把 private_key 中的 `\n` 替换成 `\\n`

### 4. 配置云函数

进入「[云函数](https://console.cloud.tencent.com/tcb/scf/index)」页面，在 ww-action、ww-callback 两个云函数的编辑页面中勾选「固定出口 IP」，保存成功后在函数配置页记录下「公网固定 IP」。

### 5. 配置第三方应用

- 在「[服务商后台 / 服务商信息](https://open.work.weixin.qq.com/wwopen/developer#/profile/basic)」的「IP白名单」中填入上一步获取的「公网固定 IP」
- 在「[服务商后台 / 应用管理 / 登录授权](https://open.work.weixin.qq.com/wwopen/developer#/sass/power/login)」的「登录授权发起域名」和「授权完成回调域名」中填入步骤 1 中获取的「静态域名」
- 在应用详情页面：
	- 编辑「使用配置」，点击「校验可信域名归属」，下载校验文件，把文件上传到「[云开发控制台 / 静态网站托管](https://console.cloud.tencent.com/tcb/hosting)」的根目录
	- 编辑「回调配置」，点击「数据回调URL」和「指令回调URL」的「申请校验」链接
	- 回调 URL 校验完成后，点击应用详情页面的「刷新 Ticket」按钮

### 6. 安装测试

点击应用详情页右上角「安装测试」按钮进行测试安装。安装完成后可在企业微信工作台点击应用图标进入 demo 应用。
