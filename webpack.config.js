const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

// In case we want to differentiate between PROD and DEV environments at least we have a const ready
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Extract text plugin is required to convert scss import in App.ts to external stylesheet
 * @type {ExtractTextPlugin}
 */
const extractPlugin = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true
});

module.exports = {
    /**
     * Tell Webpack we want sourcemaps in our developer tools
     * Note this ternary is a hack, because there prod will not build with sourcemaps
     * https://github.com/webpack-contrib/sass-loader/issues/351
     */
    devtool: isProduction ? "": "source-map",
    /**
     * This is the entry point for our application src/App.ts everything including an import to our scss goes through here
     */
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './App.ts',
    },
    /**
     * This is where our bundled stuff is saved and the public path is what we link to in our script tags
     */
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        // Set this to whatever the relative asset path will be on your server
        publicPath: '/assets'
    },
    /**
     * Sets the options for webpack-dev-server uses hot reloading by default
     */
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        // Access localhost through any device via YOUR_IPV4_ADDRESS:PORT ex. 192.168.1.9:8080
        host: '0.0.0.0',
        disableHostCheck: true,
        compress: false,
        port: 8080,
        // Controls terminal output for build process
        stats: "normal"
    },
    /**
     * This will warn us if any of our compiled assets are over 250kb (default value)
     */
    performance: { hints: isProduction ? "warning" : false },
    /**
     * Resolver helps webpack find module code that needs to be included for every bundle
     */
    resolve: {
        /**
         * Specify which extensions we want to look at for module bundling
         */
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        /**
         * Include our typescript and sass loaders
         */
        rules: [
            /**
             * Loader for TSHint
             */
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    rules: {
                        configuration: require('./tslint.json')
                    }
                }
            },
            /**
             * Typescript loader, excludes node_modules in case any dependencies use ts
             */
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'ts-loader'
            },
            /**
             * Style loaders extractPlugin takes bundled css and creates an external stylesheet
             */
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    /**
                     * Creates a <style></style> block with CSS in head if all other loaders fail
                     */
                    fallback: "style-loader",
                    use: [
                        /**
                         * Bundles our CSS with sourcemaps and minify
                         */
                        { loader: "css-loader", options: {importLoaders: 1, sourceMap: true, minimize: true}},
                        /**
                         * Applies autoprefixer to our CSS as well as any other PostCSS plugins
                         */
                        {
                            loader: "postcss-loader", options: {
                            sourceMap: true,
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                /**
                                 * Allows for future CSS to be used today, probably best not used with Sass
                                 */
                                //require('postcss-cssnext')(),

                                // Automatically add vendor prefixes to compiled SCSS
                                require('autoprefixer')({ browsers: "last 2 versions" }),
                            ]
                        }
                        },
                        /**
                         * Compiles our SCSS code with sourcmaps
                         */
                        { loader: "sass-loader", options: {sourceMap: true}},
                        /**
                         * Automatically correct low-hanging stylelint errors on build
                         */
                        { loader: "stylefmt-loader", options: { config: ".stylelintrc"}}
                    ],
                }),
            },
        ]
    },
    /**
     * Include webpack plugins
     */
    plugins: [
        /**
         * Ensures that common libraries are not to duplicated in our bundle. Packages up all common libraries so
         * they only occur once (i.e. lodash, jQuery)
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            /**
             * Automatically detect libraries in node_modules for bundling in common.js
             * @param module
             * @returns {boolean}
             */
            minChunks: (module)=> {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        /**
         * Prevents generation of imported modules matching require expressions
         */

        // Ex. We want everything in moment, but want to only exclude locales
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        /**
         * Lint our styles works with css and all it's preprocessors
         */
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
        }),
        /**
         * Shows a desktop notification when builds are complete
         */
        new WebpackNotifierPlugin({
            title: 'CET Build',
            alwaysNotify: true
        }),
        /**
         * Creates a fancy progress bar in the terminal and uses chalk to make the terminal colors all like um pretty and stuff
         */
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.blue.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        /**
         * Extracts bundled compiled scss and creates an external stylesheet to link to in our index.html
         */
        extractPlugin
    ]
};