// vue.config.js
const EncodingPlugin = require("webpack-encoding-plugin");
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  configureWebpack: {
    plugins: [new EncodingPlugin({ encoding: "GB2312" })]
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://apin.eastday.com/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
