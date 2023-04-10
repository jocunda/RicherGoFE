const path = require("path");
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
require("dotenv").config({ path: "./.env" });

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    entry: './src/index.ts',
    target: target,
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
                        options: { publicPath: "" }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ],
                    }
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                app_home: process.env.DEV_APPHOME,
                app_login: process.env.DEV_APPLOGIN
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react
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
        new ReactRefreshWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    devtool: "source-map",
    devServer: {
        port: 3000,
        static: './dist',
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
             //change it to 'http://localhost:3000' for secure option
          },
    }
}