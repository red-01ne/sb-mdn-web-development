const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
    target: "web",
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        overlay: true
    },
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Sandbox - web development",
            favicon: "./src/assets/sandbox-icon-16x16.png"
        })
    ]
};

module.exports = config;
