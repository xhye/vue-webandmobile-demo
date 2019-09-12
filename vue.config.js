const path = require('path');
const setPath = folderName => path.join(__dirname, folderName);
module.exports = {
  productionSourceMap: false,
  devServer: { // 开发代理
    port: 80,
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:8090/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: { // webpack 配置
    resolve: {
      alias: { // 简化文件路径
        '@': setPath('src'),
        '@mixin': setPath('src/mixins'),
        '@components': setPath('src/components'),
        '@utils': setPath('src/utils')
      }
    }
  }
}
