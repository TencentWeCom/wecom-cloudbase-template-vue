const tcb = require('@cloudbase/node-sdk');
const wecom = require('@wecom/cloudbase-framework-plugin-node-sdk');

const suiteId = process.env.WECOM_SUITE_ID;

const app = wecom.init({
  cloudbase: tcb.init({ env: tcb.SYMBOL_CURRENT_ENV }),
});

const auth = app.cloudbase.auth();
const db = app.cloudbase.database();

exports.main = async (event) => {
  const { userInfo } = await auth.getEndUserInfo();
  if (!userInfo.customUserId) {
    throw new Error('Missing customUserId');
  }

  const wecomUserRes = await db
    .collection('my-user')
    .where({ open_userid: userInfo.customUserId })
    .limit(1)
    .get();

  const wecomUser = wecomUserRes.data[0];
  if (!wecomUser) {
    throw new Error('Missing user_info');
  }

  const req = {
    url: event.url,
    suiteId,
    corpId: wecomUser.corp_id,
  };
  if (event.type === 'agent') {
    return app.getAgentJSAPISignature(req);
  }
  return app.getCorpJSAPISignature(req);
};
