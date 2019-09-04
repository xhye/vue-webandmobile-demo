/* eslint-disable */
import api from '../api'

/**
 * 运行环境判断
 */
export default class Environment {
  /**
   * 检查运行环境 是不是移动端
   * @returns {*}
   */
  static async checkEnvironment () {
    const mobileAgent = ['iphone', 'ipod', 'ipad', 'android', 'mobile', 'blackberry', 'webos', 'incognito', 'webmate', 'bada', 'nokia', 'lg', 'ucweb', 'skyfire']
    const browser = navigator.userAgent.toLowerCase()
    let isMobile = false
    for (let i = 0; i < mobileAgent.length; i++) {
      if (browser.indexOf(mobileAgent[i]) !== -1) {
        isMobile = true
        break
      }
    }
    console.log('这是移动端：', browser)
    return isMobile
  }

  /**
   * 判断是否企业微信终端打开
   * @returns {boolean}
   */
  static async isQYWeixin () {
    const browser = navigator.userAgent.toLowerCase()
    const result = browser.indexOf('micromessenger') !== -1 && browser.indexOf('wxwork') !== -1
    console.log('这是企业微信终端打开', result)
    return result
  }

  /**
   * 注册企业微信 jssdk
   * @returns {Promise<void>}
   */
  static async QYJSSDKConfig (callBack) {
    const url = location.href.split('#')[0]
    const config = await api.wx.geJSSDKConfig(url)
    console.log('QYJSSDKConfig res', config)
    config.jsApiList = ['getLocation', 'openLocation']
    wx.config(config)
    wx.ready(async function() {
      console.log('QYJSSDKConfig ready')
      await Environment.wxJSSDKAgentConfig(url,callBack)
    })
    wx.error(function(res) {
      console.log('QYJSSDKConfig error', res)
    })
  }

  /**
   *
   * agentConfig的作用
   * config注入的是企业的身份与权限，而agentConfig注入的是应用的身份与权限。
   * 尤其是当调用者为第三方服务商时，通过config无法准确区分出调用者是哪个第三方应用，而在部分场景下，
   * 又必须严谨区分出第三方应用的身份，此时即需要通过agentConfig来注入应用的身份信息
   * @returns {Promise<void>}
   */
  static async wxJSSDKAgentConfig (url,callBack) {
    const config = await api.wx.geJSSDKConfig(url, true)
    console.log('QYJSSDKConfig res', config)
    config.jsApiList = ['selectExternalContact', 'openUserProfile', 'thirdPartyOpenPage', 'getCurExternalContact']
    // config.debug = false
    config.success = function(res) {
      console.log('wxJSSDKAgentConfig success', res)
      // 回调
      callBack(true)
    }
    config.fail = function(res) {
      console.log('wxJSSDKAgentConfig fail', res)
      if (res.errMsg.indexOf('function not exist') > -1) {
        alert('版本过低请升级')
      }
      callBack(false)
    }
    wx.config(config)
  }
}
