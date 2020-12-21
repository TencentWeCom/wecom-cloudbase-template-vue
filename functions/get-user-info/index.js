const tcb = require('@cloudbase/node-sdk');
const wecom = require('@wecom/cloudbase-framework-plugin-node-sdk');

const suiteId = process.env.WECOM_SUITE_ID;

const app = wecom.init({
  cloudbase: tcb.init({ env: tcb.SYMBOL_CURRENT_ENV }),
});

const auth = app.cloudbase.auth();
const db = app.cloudbase.database();

exports.main = async () => {
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

  const authInfo = await app.getAuthInfo({
    corpId: wecomUser.corp_id,
    suiteId,
  });

  return {
    openUserId: userInfo.customUserId,
    corpId: wecomUser.corp_id,
    userId: wecomUser.user_id,
    agentId: authInfo.agentId,
  };
};
