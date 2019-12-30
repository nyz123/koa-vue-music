const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap:false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true,
      },
    }
  }
}
