const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const transformInferno = require("ts-transform-inferno").default;
module.exports = {
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
    path: path.resolve(__dirname, "..", "dist"),
    pathinfo: false,
  },
  optimization: {
    nodeEnv: "development",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
