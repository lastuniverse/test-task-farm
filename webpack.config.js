const path = require('path');
const webpack = require('webpack');
// const fs = require('fs');


let config = {
    // cache: true,
    stats: {
        colors: true,
        reasons: true
    },
    entry: {
        main: ['./public/source/main.js'],
    },
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: '[name].js',
        // clean: true,
        chunkFormat: 'commonjs',
    },

    plugins: [],
    resolve: {
        extensions: [ '.js' ]
    },    
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        plugins: ["@babel/plugin-proposal-class-properties"],
                        presets: ["@babel/preset-env"],

                    }
                }
            }
        ],
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        console.log('!!!!', 'production');
        config = {
            ...config,
            mode: 'production',
            target: 'es5',
            devtool: false,
            // devtool: 'source-map',
            optimization: {
                minimize: true,
                // minimizer: [
                //     new TerserPlugin({
                //         terserOptions: {
                //             keep_classnames: true,
                //             keep_fnames: true
                //         }
                //       })
                //     ]
             },
        };
    }else{
        console.log('!!!!', 'development');
        config = {
            ...config,
            mode: 'development',
            target: 'es5',
            devtool: 'source-map',
        };
        
    }
    return config;
};
