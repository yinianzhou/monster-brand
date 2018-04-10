const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//判断当前环境  配合cross-env
const env = process.env.NODE_ENV || 'development';
const debug = env !== 'production';

const webpack_conf = {
    name: 'oneyear',
    target: 'web',
    devtool: debug ? 'cheap-module-source-map' : '',

    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css']
    },
    module: {},
};

const APP_ENTRY_PATHS = [
    './demo/index.js'
];

webpack_conf.entry = {
    app: APP_ENTRY_PATHS
};

webpack_conf.output = {
    path: path.join(__dirname, '/demo/dist'),
    publicPath: '/',
    filename: debug ? '[name].js' : '[hash:8].[name].js',
    chunkFilename: debug ? '[name].js' : '[name].[chunkhash].js',

};

webpack_conf.plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(env)
        }
    }),
   
    new CleanWebpackPlugin([`/demo/dist/*.js`], {
        verbose: true,
        dry: false
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname + `/demo/index.html`),
        hash: false,
        filename: 'index.html',
        minify: {
            collapseWhitespace: true
        }
    }),
];
if (debug) {
    webpack_conf.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    webpack_conf.devServer = {
        contentBase: path.join(__dirname, '/demo'),
        port: 8000,
        host: 'localhost',
        historyApiFallback: true,
        inline: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
} else {
    webpack_conf.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}

webpack_conf.module.rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
    },
    {
        test: /\.(less|css)$/,
        use: ["style-loader", "css-loader", "less-loader"]
    }, {
        test: /\.(png|jpg|gif|md)$/,
        use: ['url-loader?limit=10000&name=images/[md5:hash:base64:10].[ext]']
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=image/svg+xml']
    }
];

module.exports = webpack_conf;