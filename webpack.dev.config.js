const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
    mode: "development",
    target: "web",
    devtool: "eval-source-map",
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, "dist")
    },
    entry: {
        main: "./src/index.js",
    },
    output: {
        filename: "[name].js",
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
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
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
