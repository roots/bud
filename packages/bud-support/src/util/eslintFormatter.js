"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const text_table_1 = __importDefault(require("text-table"));
const cwd = process.cwd();
/**
 * Is error
 */
function isError(message) {
    if (message.fatal || message.severity === 2) {
        return true;
    }
    return false;
}
/**
 * Get relative file path
 */
function getRelativePath(filePath) {
    return path_1.default.relative(cwd, filePath);
}
/**
 * eslint formatter
 */
const formatter = function (results) {
    let output = '\n';
    let hasErrors = false;
    let reportContainsErrorRuleIDs = false;
    results.forEach(result => {
        if (result.messages.length === 0) {
            return;
        }
        let messages = result.messages.map(message => {
            let type;
            if (isError(message)) {
                type = 'error';
                hasErrors = true;
                if (message.ruleId) {
                    reportContainsErrorRuleIDs = true;
                }
            }
            else {
                type = 'warn';
            }
            let line = (message.line || 0).toString();
            if (message.column) {
                line += ':' + message.column;
            }
            const position = chalk_1.default.bold('Line ' + line + ':');
            return [
                '',
                position,
                type,
                message.message.replace(/\.$/, ''),
                chalk_1.default.underline(message.ruleId || ''),
            ];
        });
        if (hasErrors) {
            messages = messages.filter(m => m[2] === 'error');
        }
        messages.forEach(m => {
            m[4] =
                m[2] === 'error' ? chalk_1.default.red(m[4]) : chalk_1.default.yellow(m[4]);
            m.splice(2, 1);
        });
        const outputTable = text_table_1.default(messages, {
            align: ['l', 'l', 'l'],
            stringLength(str) {
                return strip_ansi_1.default(str).length;
            },
        });
        // print the filename and relative path
        output += `${getRelativePath(result.filePath)}\n`;
        // print the errors
        output += `${outputTable}\n\n`;
    });
    if (reportContainsErrorRuleIDs) {
        output +=
            'Search for the ' +
                chalk_1.default.underline(chalk_1.default.red('keywords')) +
                ' to learn more about each error.';
    }
    return output;
};
exports.default = formatter;
//# sourceMappingURL=eslintFormatter.js.map