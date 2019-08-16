const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/manifest.json', to: 'manifest.json' },
            { from: 'src/assets', to: 'assets' },
            { from: 'src/css', to: 'css' },
            { from: 'src/fonts', to: 'fonts' },
            { from: 'node_modules/@fortawesome/fontawesome-free/css/all.css', to: 'css/fontawesome.css' },
            { from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts' },
            { from: 'node_modules/xlnt/dist/xlnt.wasm', to: 'xlnt.wasm' },
        ]),
        new WorkboxPlugin.GenerateSW(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        disableHostCheck: true
    },
    node: {
        fs: "empty"
    },
    output: {
        path: path.resolve(__dirname, "../backendFunctions/public"),
        filename: "[name].[chunkhash].js"
    }
}