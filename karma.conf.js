// Karma configuration
// Generated on Fri Jun 23 2017 22:42:23 GMT-0700 (PDT)
const webpackConfig = require('./webpack.config');
//delete webpackConfig.entry;

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'src/**/*.spec.ts',
            'src/**/*.html'
            //'./node_modules/babel-polyfill/dist/polyfill.js',
            //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['sourcemap', 'webpack'],
            'src/**/*.html': ['html2js']
        },

        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            plugins: webpackConfig.plugins
        },

        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'spec', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
