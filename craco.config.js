const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                "buffer": require.resolve("buffer"),
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "util": require.resolve("util"),
                "path": require.resolve("path-browserify"),
                "querystring": require.resolve("querystring-es3"),
                "url": require.resolve("url"),
                "zlib": require.resolve("browserify-zlib"),
                "http": require.resolve("stream-http"),
                "fs": false,
                "net": false
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                    process: 'process/browser',
                }),
            ];

            webpackConfig.ignoreWarnings = [
                {
                    module: /html5-qrcode/,
                    message: /Failed to parse source map/,
                },
            ];

            return webpackConfig;
        },
    },
};
