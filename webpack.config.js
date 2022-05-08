var webpack = require('webpack')

module.exports = {
    entry: {
        entry: '/src/main.js'
    },
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: "unambiguous",
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread', "es6-promise"]
                    }
                }
            }
        ]
    }
}