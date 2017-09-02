const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const fonts = require('./webpack/fonts');

const PATHS = {
    source: path.join(__dirname, 'public/assets'),
    build: path.join(__dirname, 'public/dist')
};

const common = merge([
    {
        entry: {
            'welcome': PATHS.source + '/js/welcome.js',
            'works': PATHS.source + '/js/works.js',
            'about': PATHS.source + '/js/about.js',
            'blog': PATHS.source + '/js/blog.js',
            'article': PATHS.source + '/js/article.js',
            'admin': PATHS.source + '/js/admin.js',
            'profile': PATHS.source + '/js/profile.js',
            'error': PATHS.source + '/js/error.js',
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        devtool: 'cheap-eval-source-map',
        plugins: [

            new CleanWebpackPlugin(['build']),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['welcome', 'works', 'about', 'blog', 'article']
            })
        ],
    },
    fonts()
]);


module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCss(),
            uglifyJs()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            sass(),
            css()
        ])
    }
};