const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8888, //指定端口号以侦听
    proxy: {
      '/api': {
        target: 'http://43.143.204.40:9090/',
      },
    },
  },
});
