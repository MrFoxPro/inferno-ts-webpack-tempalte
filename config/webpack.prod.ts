import merge from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";

import common from "./webpack.config";

export default merge(common, {
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
    minimizer: [
      new TerserPlugin({
        parallel: 6,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          compress: true,
          ecma: 2020,
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
});
