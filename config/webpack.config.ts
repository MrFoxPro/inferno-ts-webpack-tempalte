import path from "path";

import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import transformInferno from "ts-transform-inferno";
const config: Configuration = {
  mode: "development",
  context: path.resolve(__dirname, "../"),
  devtool: "cheap-eval-source-map",
  stats: "errors-warnings",
  entry: {
    app: "./src/index.tsx",
  },
  devServer: {
    writeToDisk: false,
    index: "app.html",
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: [/node_modules/, /.git/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [transformInferno()],
              }),
            },
          },
        ],
        exclude: [/node_modules/, /.git/],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot|otf|mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 4096,
            },
          },
        ],
        exclude: [/.git/],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      filename: "app.html",
      template: "./assets/html/index.html",
      chunks: ["app"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      esModule: true,
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
    alias: {
      inferno: "inferno/dist/index.dev.esm.js",
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
export default config;
