const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,
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
        new CleanWebpackPlugin(),
        new ModuleFederationPlugin({
            name: "app_home",
            filename: "remoteEntry.js",
            exposes: {
                // expose each component
                "./CounterAppHome": "./src/components/CounterAppHome",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps.react
                },
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps["react-dom"],
                },
                "react-router-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps["react-router-dom"],
                },
            },
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    devtool: "source-map",
    devServer: {
        port: 3001,
        static: './dist',
        hot: true,
    },
    
}