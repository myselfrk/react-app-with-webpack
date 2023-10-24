const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const getEnvironmentVariables = require("./getEnvironmentVariables");

const env = getEnvironmentVariables();

module.exports = {
  mode: "development",
  stats: "errors-only",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    environment: {
      arrowFunction: false, // https://github.com/babel/babel-loader#top-level-function-iife-is-still-arrow-on-webpack-5
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|mp3|aac|ogg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
    }),
    new DefinePlugin(env.stringified),
  ],
};
