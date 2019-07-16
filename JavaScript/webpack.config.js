const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/css', to: 'css' },
            { from: 'src/fonts', to: 'fonts' },
            { from: 'node_modules/@fortawesome/fontawesome-free/css/all.css', to: 'css/fontawesome.css' },
            { from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts' },
        ]),
    ],
}