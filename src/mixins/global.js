/**
 * 全局混入
 * @type {{data(): *, created(): void}}
 */
const mixin = {
  data() {
    return {
      environment: { // 用户使用环境 默认 防止报错
        isTablet: false, // 是否平板
        isPhone: false, // 是否手机  包括安卓 苹果 手机企业微信客户端
        isPc: false, // 是否电脑浏览器 包括电脑企业微信客户端你
        isQYWeixin: false // 是否企业微信
      }
    }
  },
  created () {
    this.environment = this.$global.data.environment ? this.$global.data.environment: this.$utils.environment.checkRunEnvironment()
    console.log(`${this.$route.path} mixin environment`, this.environment)
  }
}
export default  mixin
