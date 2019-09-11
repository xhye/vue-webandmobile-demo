import req from './request'

/**
 * 企业微信配置相关
 */
export default {
  /**
   * 获取JSSDK配置
   * @returns {*}
   */
  geJSSDKConfig (url, noncestr, timestamp, isAgent = false) {
    return req.get(`/wechat_jssdk/config?url=${url}&nonceStr=${noncestr}&timestamp=${timestamp}&isAgent=${isAgent}`)
  }
}
