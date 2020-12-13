const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: {
    app: "./vue/app.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/js/",
  },
  module: {
    rules: [
      { test: /\.vue$/, use: [{ loader: "vue-loader" }] },
      { test: /\.js$/, use: [{ loader: "babel-loader" }] },
      { test: /\.ts$/, use: [{ loader: "ts-loader" }] },
      { test: /\.(css|sass|scss)$/, use: ["vue-style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".vue", ".js", ".ts"],
    /*alias: {
      "@": path.resolve("vue/scripts"),
      "@views": path.resolve("vue/scripts/landmark_system/views"),
      "@models": path.resolve("vue/scripts/landmark_system/models"),
      "@util": path.resolve("vue/scripts/landmark_system/util"),
      "@controllers": path.resolve("vue/scripts/landmark_system/controllers"),
      "@events": path.resolve("vue/scripts/landmark_system/events"),
      "@features": path.resolve("vue/scripts/landmark_system/features"),
    },*/
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      template: "./public/views/index.html",
    }),*/
    new VueLoaderPlugin(),
  ],
};
