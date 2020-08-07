import { format } from 'prettier';
import { highlight } from 'cli-highlight';
import { shortCircuit } from './shortCircuit';
/**
 * Dump a prettified, syntax-highlighted object
 */
var dump = function (obj, prettierOptions) {
    var prettierConfig = prettierOptions !== null && prettierOptions !== void 0 ? prettierOptions : { parser: 'json' };
    var normalizedString = JSON.stringify(obj, shortCircuit());
    var prettifiedString = format(normalizedString, prettierConfig);
    var highlightedConfig = highlight(prettifiedString);
    console.log(highlightedConfig);
};
export { dump };
//# sourceMappingURL=dump.js.map