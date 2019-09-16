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
  static checkEnvironment() {
    const mobileAgent = ['iphone', 'ipod', 'ipad', 'android', 'mobile', 'blackberry', 'webos', 'incognito', 'webmate', 'bada', 'nokia', 'lg', 'ucweb', 'skyfire']
    const browser = navigator.userAgent.toLowerCase()
    let isMobile = false
    for (let i = 0; i < mobileAgent.length; i++) {
      if (browser.indexOf(mobileAgent[i]) !== -1) {
        isMobile = true
        break
      }
    }
    console.log('浏览器信息：', browser)
    return isMobile
  }

  /**
   * 检查运行环境 pc 手机 平板
   * @returns {*}
   */
  static checkRunEnvironment() {
    const ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isIPhone = /(?:iPhone)/.test(ua) && !isTablet,
      _isAndroid = /(?:Android)/.test(ua) && !isTablet,
      isPc = !isIPhone && !isAndroid && !isSymbian && !isTablet;
    console.log('navigator.userAgent', ua)
    const result =  {
      isTablet: isTablet,
      isPhone: isIPhone || isSymbian || _isAndroid,
      isPc: isPc,
      isQYWeixin: this.isQYWeixin()
    }
    return result
  }

  /**
   * 判断是否企业微信终端打开
   * @returns {boolean}
   */
  static async isQYWeixin() {
    const browser = navigator.userAgent.toLowerCase()
    const result = browser.indexOf('micromessenger') !== -1 && browser.indexOf('wxwork') !== -1
    console.log('这是企业微信终端打开', result)
    return result
  }

  /**
   * 注册企业微信 jssdk
   * @returns {Promise<void>}
   */
  static async QYJSSDKConfig(jsApi, callBack) {
    const url = location.href.split('#')[0]
    const config = await api.wx.geJSSDKConfig(url)
    console.log('QYJSSDKConfig res', config)
    config.jsApiList = jsApi
    wx.error(function (res) {
      console.log('=========================QYJSSDKConfig error=======================', res)
    });
    wx.ready(function () {
      console.log('======================QYJSSDKConfig ready===========================')
      // Environment.wxJSSDKAgentConfig(config.base,callBack)
      if (callBack) {
        callBack()
      }
    })
    wx.config({
      beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，企业微信的corpID
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: config.jsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
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
  static async wxJSSDKAgentConfig(base, callBack) {
    const config = await api.wx.geJSSDKConfig(base.url, base.noncestr, base.timestamp, true)
    console.log('QYJSSDKConfig res', config)
    config.jsApiList = ['selectExternalContact', 'openUserProfile', 'thirdPartyOpenPage', 'getCurExternalContact']
    // config.debug = false
    config.success = function (res) {
      console.log('=============================wxJSSDKAgentConfig success===========================', res)
      // 回调
      callBack(true)
    }
    config.fail = function (res) {
      console.log('===========================wxJSSDKAgentConfig fail===============================', res)
      if (res.errMsg.indexOf('function not exist') > -1) {
        alert('版本过低请升级')
      }
      callBack(false)
    }
    wx.config(config)
  }

  /**
   * 关闭当前浏览窗口
   * @returns {Promise<void>}
   * @constructor
   */
  static closeWebPage() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null; window.close();
      }
      else {
        window.open('', '_top'); window.top.close();
      }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
      window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的
      //window.history.go(-2);
    }
    else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  }
}
