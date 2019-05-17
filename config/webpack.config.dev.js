"use strict";

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const getClientEnvironment = require("./env");
const paths = require("./paths");
const customerConfig = require("./get-customer-config");

let {
  publicPath = "/",
  publicUrl = "",
  output = {},
  inhectEslint = false,
  babelOptions = {},
  target = "web",
} = customerConfig;

const env = getClientEnvironment(publicUrl);

module.exports = {
  target,
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    app: [
      require.resolve("react-dev-utils/webpackHotDevClient"),
      require.resolve("./polyfills"),
      paths.appIndexJs,
    ],
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: "static/js/bundle.js",
    // chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    ...output,
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx", ".ts", "tsx"],
    alias: {
      "react-native": "react-native-web",
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
  },
  module: {
    strictExportPresence: true,
    rules: [
      inhectEslint
        ? {
          test: /\.(js|jsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                formatter: eslintFormatter,
                eslintPath: require.resolve("eslint"),
              },
              loader: require.resolve("eslint-loader"),
            },
          ],
          include: paths.appSrc,
        }
        : {},
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: paths.workspacePath,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"],
                ...babelOptions,
              },
            },
          },
          {
            test: /\.scss$/,
            use: [
              require.resolve("style-loader"),
              require.resolve("css-loader"),
              require.resolve("sass-loader"),
            ],
            // include: paths.appSrc,
            // loaders: ["style", "css", "sass"]
          },
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9", // React doesn't support IE8 anyway
                      ],
                      flexbox: "no-2009",
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.sass$/, /\.scss$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // node: {
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  // },
  performance: {
    hints: false,
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
}
};