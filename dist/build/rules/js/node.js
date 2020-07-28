"use strict";
exports.__esModule = true;
exports.node = void 0;
var loaders_1 = require("../util/loaders");
/**
 * node
 *
 * @type {function} node
 * @return {object}
 */
var node = function (bud) { return ({
    bud: bud,
    rule: {},
    /**
     * Make node rules
     */
    make: function () {
        this.pre();
        this.rule = {
            test: /\.node$/,
            loader: loaders_1.loaders.node
        },
            this.post();
        return this.rule;
    },
    /**
     * Hook: pre_node
     */
    pre: function () {
        this.bud.hooks.call('pre_node', this);
    },
    /**
     * Hook: post_node
     */
    post: function () {
        this.bud.hooks.call('post_node', this.rule);
    }
}); };
exports.node = node;
//# sourceMappingURL=node.js.map