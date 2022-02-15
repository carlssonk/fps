const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist")
  },
  // resolve: {
  //   alias: {
  //     cannon: path.resolve(__dirname, "./node_modules/cannon-es/dist/cannon-es.js")
  //   },
  //   extensions: ['.tsx', '.ts', '.js'],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|glb|glft)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
}
