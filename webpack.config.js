"use strict";
const resolve = require("resolve");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
  mode: process.env.NODE_ENV,
  entry: "./src/browser/index.js",
  // devtool: "cheap-module-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  optimization: {
    nodeEnv: false,
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
              // if hmr not work, it force reload
              // reloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg|jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[ext]"    
            }
          }
        ]
      }
    ]
  }
};


const serverConfig = {
  mode: process.env.NODE_ENV,
  entry: "./src/server/server.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "build"),
    filename: "server.js",
    // libraryTarget: "commonjs2"
  },
  // devtool: "cheap-module-source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [{ loader: "css-loader" }]
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg|jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[ext]",
              // outputPath: "static/media",          
              emitFile: false  // no write file.
            }
          }
        ]
      }
    ]
  }
}

module.exports = [browserConfig, serverConfig]