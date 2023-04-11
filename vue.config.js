const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8888, //指定端口号以侦听
    proxy: {
      '/api': {
        target: 'http://43.143.204.40:9090',
        ws:true,//配置可以使用websocket
        changeOrigin:true//让请求说谎嘎嘎
      },
    },
  },
});
