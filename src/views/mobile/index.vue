<template>
  <el-container class="mobile" direction="vertical">
    <el-main class="mobile-content">
      <div :style="{ background: '#fff', minHeight: '360px', height: '100%',width: '100%' }">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer  class="mobile-menus" height="50">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/mobile/apply">审批</van-tabbar-item>
        <van-tabbar-item icon="search" to="/mobile/report">汇报</van-tabbar-item>
      </van-tabbar>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'mobile',
  components: {},
  data() {
    return {
      active: 0
    }
  },
  mounted () {
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        console.log('checkJsApi', res)
      }
    });
  },
  methods: {}
}
</script>
<style scoped lang="less">
.mobile{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-content{
    flex: 1;
    height: 100%;
    padding: 5px;
  }
  &-menus{
    height: 50px;
    margin-top: 3px;
  }
}
</style>
