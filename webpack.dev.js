const path = require("path")
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  // devServer: {
  //   static: path.resolve(__dirname, 'dist'),
  // },
})