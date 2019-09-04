<template>
  <div class="test">
    <div><a :href="url" style="color: blue">点我点我</a></div>
  </div>
</template>

<script>
export default {
  name: 'leave',
  components: {},
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.url = this.$global.data.url
  },
  methods: {}
}
</script>
<style scoped lang="less">
.test{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
