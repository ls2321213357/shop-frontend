const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8888, //指定端口号以侦听
    proxy: {
      '/api': {
        target: 'http://172.20.10.8:9090',
      },
    },
  },
});
