"use strict";
exports.__esModule = true;
exports.dump = void 0;
var prettier_1 = require("prettier");
var cli_highlight_1 = require("cli-highlight");
var shortCircuit_1 = require("./shortCircuit");
/**
 * Dump a prettified, syntax-highlighted object
 *
 * @type {Dump}
 * @param {Object} obj - object to inspect
 */
var dump = function (obj) {
    var normalizedConfigString = JSON.stringify(obj, shortCircuit_1.shortCircuit());
    var prettifiedConfigString = prettier_1.format(normalizedConfigString, {
        parser: 'json'
    });
    var highlightedConfigString = cli_highlight_1.highlight(prettifiedConfigString);
    console.log(highlightedConfigString);
    process.exit();
};
exports.dump = dump;
//# sourceMappingURL=dump.js.map