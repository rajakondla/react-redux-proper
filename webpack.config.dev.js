const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development", // webpack to run dev mode and disable production only features
  target: "web",
  devtool: "cheap-module-source-map", // lets us see original code when debugging in browser
  entry: "./src/index",
  output: {
    // webpack doesn't output code in development mode. It serves our app from memory
    // we have to declare the path so that it can put in memory and serve from there
    path: path.resolve(__dirname, "build"),
    // public url of the output directory when it referencing from browser
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal", // reduces the information that it writes to command line
    overlay: true, // overlay any errors that occur in browser
    historyApiFallback: true, // All requests send to index.html. This way we load deep links and all will be handled by react router
    // Below lines are for open issues for webpack with chrome. check and remove.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },

  plugins: [
    // webpack will replace process.env.API_URL with value specified . Here JSON.stringify is mandatory as webpack expectes value to be like this.
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
