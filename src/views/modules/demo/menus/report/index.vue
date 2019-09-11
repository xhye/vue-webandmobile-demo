<template>
  <div class="report">
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
  name: 'report',
  components: {},
  data() {
    return {
      items: [
        {name: '周报', url: '', icon: require("@/assets/logo.png")},
        {name: '月报', url: '', icon: require("@/assets/logo.png")}
      ]
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.report{
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
