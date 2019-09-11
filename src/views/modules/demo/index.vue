<template>
  <el-container class="home">
    <el-header :class="{ hidden: !environment.isPc }"
               style="margin-bottom: 20px;display: flex;align-items: center;justify-content: center;background-color: gray">
      我就是一个头
    </el-header>
    <el-container>
      <el-aside width="200px" :class="{ hidden: !environment.isPc }">
        <el-menu default-active="1"
                 :router="true"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item index="1" route="/demo/apply">
            <i class="el-icon-menu"></i>
            <span slot="title">审批</span>
          </el-menu-item>
          <el-menu-item index="2" route="/demo/report">
            <i class="el-icon-menu"></i>
            <span slot="title">汇报</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="mobile-content" :style="{ padding: screenWidth + 'px' }">
        <div :style="{ background: '#fff', minHeight: '360px', height: '100%',width: '100%' }">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
    <el-footer :class="{ hidden: environment.isPc }" class="mobile-menus" height="50">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/demo/apply">审批</van-tabbar-item>
        <van-tabbar-item icon="search" to="/demo/report">汇报</van-tabbar-item>
      </van-tabbar>
    </el-footer>
  </el-container>
</template>

<script>

  export default {
    name: 'layout',
    components: {},
    data() {
      return {
        active: 0
      }
    },
    computed: {
      screenWidth () {
        return this.environment.isPc ? 15 : 5
      },
      environment () {
        return this.$global.data.environment ? this.$global.data.environment: this.$utils.environment.checkRunEnvironment()
      }
    },

    mounted() {},
    methods: {
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
  .home {
    width: 100%;
    height: 100%;
  }

  .pd {
    padding: 30px;
  }

  .mobile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-content {
      flex: 1;
      height: 100%;
      /*padding: 5px;*/
    }

    &-menus {
      height: 50px;
      margin-top: 3px;
    }
  }

  .hidden {
    display: none !important;
  }
</style>
