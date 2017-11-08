const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: `${__dirname}/components`,
    entry: 'app.jsx',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
            }
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};