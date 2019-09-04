<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
import Environment from '../utils/environment.js'
import Auth from '../utils/auth.js'
export default {
  name: 'home',
  data () {
    return {
      isMobile: false,
      isQYWeixin: false
    }
  },
  async beforeCreate () {
    this.isMobile = await Environment.checkEnvironment() // 判断是否在移动端
    this.isQYWeixin = await Environment.isQYWeixin() // 判断是否在企业微信客户端打开
    const code = this.$route.query.code // 授权后的code code不为空时 代表正在授权
    const state = this.$route.query.state // 授权前参数
    const userId = localStorage.getItem("userId")
    if (code) {
      // 执行code to userId
      const res = await this.$api.qyuser.code2userId(code)
      console.log('code2userId', res)
      if(res.code !== 0) {
        this.$message.warning('系统异常，请刷新。')
        return
      }
      this.$global.data.deviceId = res.data.deviceId
      localStorage.setItem('deviceId', res.data.deviceId)
      if (res.code === 0 && res.data.isQYUser) { // 成功  保存信息 跳转
        this.$global.data.userId = res.data.userId
        localStorage.setItem('userId', res.data.userId)
        this.go()
      }
      if(res.code === 0 && !res.data.isQYUser) {
        alert('您不是当前企业用户')
      }
    } else {
      if(userId) { // 有用户 正常跳转
        this.go() // 正常访问
      } else { // 获取当前用户
        this.$global.data.url = await Auth.generateAuthUrl()  // 构造授权域名
        window.location.href = this.$global.data.url // 开始授权
      }
    }
  },
  methods: {
    async go() {
      await Environment.QYJSSDKConfig(this.checkJsApi) // 初始化js sdk
      if (!this.isQYWeixin) { // 不在企业微信终端
        alert('请在企业微信客户端打开')
        return
      }
      const router = this.isMobile ? '/mobile' : '/web' // 是移动端还是web端（app和桌面app）
      this.$router.push({ path: router })
    },
    /**
     * 测试js sdk
     * @param flag js sdk是否注册成功
     */
    checkJsApi(flag) {
      if(flag) {
        console.log('checkJsApi')
        wx.checkJsApi({
          jsApiList: ['checkJsApi', 'getLocation', 'openLocation','openUserProfile'],
          success: function(res) {
            console.log('checkJsApi res', res)
          }
        })
      }
    }
  }

}
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
</style>
