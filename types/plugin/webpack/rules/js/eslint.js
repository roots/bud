"use strict";
exports.__esModule = true;
exports.eslint = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
/**
 * Eslint
 * @type {function} eslint
 */
var eslint = function (builder) { return ({
    builder: builder,
    enabled: builder.bud.configs.eslint,
    enforce: 'pre',
    test: patterns_1.patterns.js,
    include: builder.bud.paths.src,
    exclude: patterns_1.patterns.vendor,
    loader: loaders_1.loaders.eslint,
    options: {
        configFile: builder.bud.configs.eslint,
        formatter: 'codeframe',
        failOnError: true
    },
    output: {},
    /**
     * Make: eslint rules
     * @property {function} make
     */
    make: function () {
        this.pre();
        this.output = this.enabled
            ? {
                enforce: this.enforce,
                test: this.test,
                include: this.include,
                exclude: this.exclude,
                loader: this.loader,
                options: this.options
            }
            : {};
        this.post();
        return this.output;
    },
    /**
     * Hook: pre_eslint
     */
    pre: function () {
        this.builder.bud.hooks.call('pre_eslint', this);
    },
    /**
     * Hook: post_eslint
     */
    post: function () {
        this.builder.bud.hooks.call('post_eslint', this.output);
    }
}); };
exports.eslint = eslint;
