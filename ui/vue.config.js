const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../docs"),
  // publicPath: '/tsla/'
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "TSLA";
          return args;
      })
  }
}
