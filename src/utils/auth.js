/**
 * 企业微信你们授权相关
 */
export default class Auth {
  /**
   * 检组装授权 url
   * @returns {*}
   */
  static async generateAuthUrl () {
    const appid = "ww4783b5de3fda6acd"
    const state = 'test'
    const url = `${window.location.href}`
    const final = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
    console.log('final', final)
    return final
  }
}
