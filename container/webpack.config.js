const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
require("dotenv").config({ path: "./.env" });

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  target: isDevelopment ? "web" : "browserslist",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s[ac]|c)ss$/i, //support sass,scss,css
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(
                  Boolean
                ),
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        app_home: process.env.DEV_APPHOME,
        app_login: process.env.DEV_APPLOGIN,
        app_items: process.env.DEV_APPITEMS,
        app_cart: process.env.DEV_APPCART,
        app_user: process.env.DEV_APPUSER,
        app_errhandling: process.env.DEV_APPERROR,
        app_header: process.env.DEV_APPHEADER,
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new CleanWebpackPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:4001",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
    static: "./dist",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
  },
};
