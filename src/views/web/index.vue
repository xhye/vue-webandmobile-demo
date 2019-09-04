<template>
  <el-container  class="home">
    <el-header style="display: flex;align-items: center;justify-content: center;background-color: gray">我就是一个头</el-header>
    <el-container style="margin-top: 20px">
      <el-aside width="200px">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>子菜单</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div @click="openUser">我的UerId是：{{userId}}</div>
        <div @click="openUser">我的信息是：{{user}}</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'web',
  components: {},
  data() {
    return {
      userId: null,
      user: null
    }
  },
  async mounted() {
    this.userId = localStorage.getItem("userId")
    const {data} = await this.$api.qyuser.userId2User(this.userId)
    this.user = data
  },
  methods: {
    openUser() {
      wx.invoke('openUserProfile', {
        'type': 1, //1表示该userid是企业成员，2表示该userid是外部联系人
        'userid': this.userId | 'YeQinHua' //可以是企业成员，也可以是外部联系人
      }, function(res) {
        if (res.err_msg !== 'openUserProfile:ok') {
          //错误处理
          alert(JSON.stringify(res))
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped lang="less">
.home{
  width: 100%;
  height: 100%;
}
</style>
