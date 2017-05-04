var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    bourbon = require('node-bourbon').includePaths,
    CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'app'),
    devServer: {
        contentBase: path.resolve(__dirname, 'app'),
    },
    entry: {
        index: './js/index.js',
        common: './js/libs.js'
    },
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{loader: 'css-loader', options: {modules: true}},]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function() {
                                    return [require('autoprefixer')];
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [bourbon]
                            },
                        },

                    ]
                })
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader'],
                /*use: [{
                    loader: 'file-loader',
                    query: {
                        useRelativePath: process.env.NODE_ENV === "production",
                    }
                }],*/
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"), // ExtractTextPlugin("css/styles.css")
        new CopyWebpackPlugin([
            {from: 'fonts/**/*'},
        ]),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'index.html',
            filename: 'index.html',
            chunks: ['index', 'common']
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'login-page.html',
            filename: 'login-page.html',
            chunks: ['index', 'common']
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'single-page.html',
            filename: 'single-page.html',
            chunks: ['index', 'common']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'scripts/common.js',
            minChunks: 2
        }),
    ]
};