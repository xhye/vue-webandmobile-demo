import req from './request'

/**
 * 企业微信用户相关
 */
export default {
  /**
   * 授权code换取用户userId
   * @returns {*}
   */
  code2userId (code) {
    return req.get(`/qyuser/code2userid?code=${code}`)
  },
  /**
   * check 判断是否已经授权过获取 userid
   * @returns {*}
   */
  userId2User (userId) {
    return req.get(`/qyuser/get/${userId}`)
  }
}
