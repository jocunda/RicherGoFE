const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

const deps = require("./package.json").dependencies;
const isDevelopment = process.env.NODE_ENV !== "production";
const isMicroFE = process.env.IS_MICRO_FE === "true";

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
        use: isMicroFE
          ? "ts-loader"
          : [
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
    new CleanWebpackPlugin(),
    isMicroFE
      ? new ModuleFederationPlugin({
          name: "app_home",
          filename: "remoteEntry.js",
          remotes: {
            app_header: process.env.DEV_APPHEADER,
          },
          exposes: {
            // expose each component
            "./CounterAppHome": "./src/components/CounterAppHome",
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
        })
      : isDevelopment && new ReactRefreshWebpackPlugin(),
    ,
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devtool: "source-map",
  devServer: {
    port: 3001,
    static: "./dist",
    hot: !isMicroFE,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
