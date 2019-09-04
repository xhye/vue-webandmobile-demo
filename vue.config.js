const path = require('path');
const setPath = folderName => path.join(__dirname, folderName);
module.exports = {
  productionSourceMap: false,
  devServer: {
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': setPath('src')
      }
    }
  }
}
