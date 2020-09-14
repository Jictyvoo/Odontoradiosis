const path = require("path");
module.exports = {
  entry: {
    app: "./views/App.tsx",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
    },
    extensions: [".tsx", ".js"],
  },
};
