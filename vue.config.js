const path = require("path");
// var webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "漫画"; // page title

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === "development",
  lintOnSave:false,
  productionSourceMap: false,
  devServer: {
    port: 8889,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/ComicA": {
        target: 'http://'+process.env.VUE_APP_API_URL, // 这个链接是要代理到的地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/ComicA": "/api", // 重写路径
        },
      },
      "/Comic": {
        target: 'http://'+process.env.VUE_APP_API_URL+':8081', // 这个链接是要代理到的地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/Comic": "", // 重写路径
        },
      },
      "/ComicSeach": {
        target: 'http://'+process.env.VUE_APP_API_URL+':8083', // 这个链接是要代理到的地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/ComicSeach": "", // 重写路径
        },
      },
      "/ComicImage": {
        target: 'http://'+process.env.VUE_APP_API_URL+':9100', // 这个链接是要代理到的地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/ComicImage": "", // 重写路径
        },
      },
      "/ComiGo": {
        target: 'http://'+process.env.VUE_APP_API_URL, // 这个链接是要代理到的地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/ComiGo": "/GO", // 重写路径
        },
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", resolve("./src"))
  //     .set("components", resolve("./src/components"))
  //     .set("views", resolve("./src/views"))
  //     .set("assets", resolve("./src/assets"));
  //   //set第一个参数：设置的别名，第二个参数：设置的路径
  // },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("/src"),
      },
    },
  },
  css: {
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       require("postcss-plugin-px2rem")({
    //         rootValue: 37.5, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
    //         // unitPrecision: 5, //允许REM单位增长到的十进制数字。
    //         //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    //         // propBlackList: [], //黑名单
    //         exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //         // selectorBlackList: [], //要忽略并保留为px的选择器
    //         // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    //         // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    //         mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
    //         minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
    //       }),
    //     ],
    //   },
    // },
  },
};
