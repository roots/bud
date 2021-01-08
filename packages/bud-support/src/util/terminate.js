"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const terminate = (code) => {
    process.on('beforeExit', (code) => {
        console.log('Process beforeExit event with code: ', code);
    });
    process.on('exit', (code) => {
        console.log('Process exit event with code: ', code);
    });
    process.exit(code);
};
exports.default = terminate;
//# sourceMappingURL=terminate.js.map