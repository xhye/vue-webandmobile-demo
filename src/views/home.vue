<template>
  <div class="home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div id="QYWXLogin" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;" v-show="environment.isPc && showQYWXLoginCode">
    </div>
  </div>
</template>

<script>
  import global from '@mixin/global'
  export default {
    name: 'home',
    mixins: [global],
    data() {
      return {
        isQYWeixin: false, // 判断是否在企业微信客户端打开
        showQYWXLoginCode: false // 显示扫码登陆容器
      }
    },
    async mounted() {
      console.log('i am home mounted')
      this.environment = await this.$utils.environment.checkRunEnvironment() // 运行环境
      this.$global.data.environment = this.environment
      this.isQYWeixin = await this.$utils.environment.isQYWeixin() // 判断是否在企业微信客户端打开
      this.$global.data.environment.isQYWeixin = this.isQYWeixin
      const code = this.$route.query.code // 授权后的code code不为空时 代表正在授权
      const state = this.$route.query.state // 授权前携带参数
      console.log('授权前携带参数', state)
      const userId = localStorage.getItem("userId") // 缓存
      // const localCode = localStorage.getItem("code")
      // const openId = localStorage.getItem("openId")

      this.go()

      // if (this.environment.isPc && !this.isQYWeixin) { // 电脑端打开
      //   if (code) {
      //     this.codeToUser(code)
      //   } else {
      //     if(userId) { // 有用户 正常跳转  而且还需要检查测登录状态 暂时没写检测登录状态
      //       this.go() // 正常访问
      //     } else { // 获取当前用户
      //       this.showQYWXLoginCode = true // 显示扫码登陆容器
      //       const url = `${window.location.href}`
      //       // const url = encodeURIComponent('it-rose-test.club')
      //       window.WwLogin({
      //         "id" : "QYWXLogin",
      //         "appid" : "ww4783b5de3fda6acd",
      //         "agentid" : "1000002",
      //         "redirect_uri" : url,
      //         "state" : "test WwLogin",
      //         "href" : "",
      //       });
      //     }
      //   }
      // } else if (this.isQYWeixin) { // 企业微信打开 不分pc 移动
      //   if (code) {
      //     this.codeToUser(code)
      //   } else {
      //     if(userId) { // 有用户 正常跳转
      //       this.go() // 正常访问
      //     } else { // 获取当前用户
      //       this.$global.data.url = await this.$utils.auth.generateAuthUrl()  // 构造授权域名
      //       window.location.href = this.$global.data.url // 开始授权
      //     }
      //   }
      // } else {
      //   await this.$router.push({path: '/error', query: {msg: "请在企业微信客户端或PC浏览器打开。"}}) // 跳转错误页面
      // }
    },

    methods: {
      go() {
        console.log('是否企业微信打开：', this.isQYWeixin)
        this.$router.push({path: '/demo'})
      },
      async codeToUser (code) { // 执行code to userId
        const res = await this.$api.qyuser.code2userId(code)
        console.log('code2userId', res)
        if (res.code !== 0) {
          this.$message.warning('系统异常，请稍后重试。')
          return
        }
        localStorage.setItem('code', code)
        this.$global.data.deviceId = res.data.deviceId
        localStorage.setItem('deviceId', res.data.deviceId)
        if (res.code === 0 && res.data.isQYUser) { // 成功  保存信息 跳转
          this.$global.data.userId = res.data.userId
          localStorage.setItem('userId', res.data.userId)
          this.go()
        }
        if (res.code === 0 && !res.data.isQYUser) {
          localStorage.setItem('openId', res.data.openId)
          alert('您不是当前企业用户')
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
