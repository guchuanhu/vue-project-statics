let nodeModules = {};
let fs = require("fs");
//获取到的模块都是安装在本地的模块，全局模块无法检测到。
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = mod;
});
module.exports = {
    devtool: 'eval-source-map',
    mode: "development",
  
    entry:  __dirname + "/app/express.js",
    output: {
      path: __dirname + "/public",
      filename: "express.bundle.js"
    },
    target: 'node',
    externals: Object.assign(nodeModules)
  }