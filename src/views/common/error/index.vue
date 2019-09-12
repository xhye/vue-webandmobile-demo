<template>
  <div class="container">
    <c-error :msg="msg"></c-error>
  </div>
</template>

<script>
  import Error from '../../../components/error'
  export default {
    name: 'error',
    components: {
      'c-error': Error
    },
    data() {
      return {
        msg: '系统异常，请稍后重试。'
      }
    },
    computed: {},
    mounted() {
      this.msg = this.$route.query.msg
    },
    methods: {}
  }
</script>
<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
  }
</style>
