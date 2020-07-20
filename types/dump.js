"use strict";
exports.__esModule = true;
exports.dump = void 0;
var prettier_1 = require("prettier");
var cli_highlight_1 = require("cli-highlight");
/**
 * Dump generated config (bud.dump)
 */
var dump = function (obj) {
    var normalizedConfigString = JSON.stringify(obj, shortCircuit());
    var prettifiedConfigString = prettier_1.format(normalizedConfigString, { parser: 'json' });
    var highlightedConfigString = cli_highlight_1.highlight(prettifiedConfigString);
    console.log(highlightedConfigString);
    process.exit();
};
exports.dump = dump;
/**
 * JSON.stringify replacement fn
 * Prevents circular references in JSON from looping
 */
var shortCircuit = function () {
    // eslint-disable-next-line no-undef
    var seen = new WeakSet();
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value) || key == 'UI') {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
