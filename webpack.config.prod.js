const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// for minifying the css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// to report what is there in our bundle file
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production", // webpack to run production mode and enable production only features
  target: "web",
  devtool: "source-map", // quality code will be visibled as source, but take more time than dev source map
  entry: "./src/index",
  output: {
    // webpack outputs the code in production mode. It serves our app from physical file
    path: path.resolve(__dirname, "build"),
    // public url of the output directory when it referencing from browser
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // below line make sure webpack automatically display as report when build is completed
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    // webpack will create a minified css file. webpack will pick name for us and add # to it. This way file name only changes when css changes
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    // webpack will replace process.env.API_URL with value specified . Here JSON.stringify is mandatory as webpack expectes value to be like this.
    new webpack.DefinePlugin({
      // below line make sure React is built in prod mode
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    // it generated index.html and references js bundle and css bundle. File name having # can be cached in web server.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
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
        use: [
          // extract the css and load in a file using css loader and generate the source map for debugging purposes.
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          // loader will run from bottom. so post css loader first minifies the css using css nano and hand it over to css loader which will copy the content in seperate file.
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
