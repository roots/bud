"use strict";
exports.__esModule = true;
exports.flags = void 0;
var yargs_1 = require("yargs");
var flags = {
    name: 'flags',
    register: {
        log: yargs_1.argv.hasOwnProperty('log'),
        hot: yargs_1.argv.hasOwnProperty('hot'),
        watch: yargs_1.argv.hasOwnProperty('watch')
    }
};
exports.flags = flags;
//# sourceMappingURL=flags.js.map