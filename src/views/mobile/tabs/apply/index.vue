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
        {name: '请假', url: '/mobile/apply/leave', icon: require("@/assets/logo.png")},
        {name: '费用报销', url: '', icon: require("@/assets/logo.png")},
        {name: '加班申请', url: '', icon: require("@/assets/logo.png")},
        {name: this.$global.data.userId | localStorage.getItem("userId"), url: '', icon: require("@/assets/logo.png")}
      ]
    }
  },
  mounted() {
    console.log('this.$global.data.userId', this.$global.data.userId)
    console.log('localStorage.getItem("userId")', localStorage.getItem("userId"))
  },
  methods: {}
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
