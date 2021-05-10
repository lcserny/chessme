const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        server: './src/server.ts',
        client: './src/client.ts',
    },
    devtool: 'inline-source-map',
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /tests/],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};
