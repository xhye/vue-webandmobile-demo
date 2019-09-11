<template>
  <div class="apply">
    <van-grid :column-num="3">
      <van-grid-item
          v-for="(item,index) in items"
          :to="item.url"
          :key="index">
        <img slot="icon" :src="item.icon" />
        <span slot="text">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>

export default {
  name: 'apply',
  components: {},
  data() {
    return {
      items: [
        {name: '请假', url: '/demo/apply/leave', icon: require("@/assets/logo.png")},
        {name: '费用报销', url: '', icon: require("@/assets/logo.png")},
        {name: '加班申请', url: '', icon: require("@/assets/logo.png")}
      ]
    }
  },
  mounted() {
    //本页面调用的jssdk Api
    console.log('this.$global.data.userId', this.$global.data.userId)
    console.log('localStorage.getItem("userId")', localStorage.getItem("userId"))
    // const jsApi = ['getLocation', 'openLocation']
    // this.$utils.environment.QYJSSDKConfig(jsApi, this.configSuccess) // 初始化js sdk
  },
  methods: {
    configSuccess() {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
        }
      });
    }
  }
}
</script>
<style scoped lang="less">
.apply{
  width: 100%;
  height: 100%;
}
img{
  width: 40px;
  height: 40px;
}
span{
  margin-top: 5px;
  font-size: 14px;
  line-height: 16px;
}
</style>
