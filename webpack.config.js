const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const env = process.env.WEBPACK_ENV;
const isDev = process.env.NODE_ENV !== 'production';


var libraryName = 'symjs';
var plugins = [], outputFile;

if (env === 'build' && !isDev) {
    plugins.push(new UglifyJsPlugin());
    outputFile = libraryName + '.min.js';
    console.log(outputFile)
} else {
    outputFile = libraryName + '.js';
}

module.exports = {
    mode: isDev ? process.env.NODE_ENV : 'production',
    entry:  __dirname + '/index.js',
    devtool: isDev ? 'source-map' : false,
    node: { fs: 'empty' },
    output: {
        filename: outputFile,
        library: 'symjs',
        libraryTarget: 'umd',
        auxiliaryComment: 'symjs beta version...',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            },
        ]
    }
};
