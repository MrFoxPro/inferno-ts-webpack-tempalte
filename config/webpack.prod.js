const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

const common = require("./webpack.config");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  optimization: {
    minimize: true,
    nodeEnv: "production",
    removeEmptyChunks: true,
    removeAvailableModules: true,
    occurrenceOrder: true,
    providedExports: true,
    concatenateModules: true,
    namedChunks: true,
    namedModules: true,
    usedExports: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        parallel: 6,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          compress: true,
          ecma: 5,
          output: {
            comments: false,
            source_map: {
              includeSources: false,
            },
          },
        },
      }),
    ],
  },
  resolve: {
    alias: {
      inferno: "inferno/dist/inferno.min.js",
    },
  },
});
