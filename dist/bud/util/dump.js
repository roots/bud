"use strict";
exports.__esModule = true;
exports.dump = void 0;
var prettier_1 = require("prettier");
var cli_highlight_1 = require("cli-highlight");
var shortCircuit_1 = require("./shortCircuit");
/**
 * Dump a prettified, syntax-highlighted object
 */
var dump = function (obj, prettierOptions) {
    var prettierConfig = prettierOptions !== null && prettierOptions !== void 0 ? prettierOptions : { parser: 'json' };
    var normalizedString = JSON.stringify(obj, shortCircuit_1.shortCircuit());
    var prettifiedString = prettier_1.format(normalizedString, prettierConfig);
    var highlightedConfig = cli_highlight_1.highlight(prettifiedString);
    console.log(highlightedConfig);
};
exports.dump = dump;
//# sourceMappingURL=dump.js.map