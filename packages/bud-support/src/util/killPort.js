"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.killPort = void 0;
const child_process_1 = require("child_process");
const killPort = port => child_process_1.exec(`kill $(lsof -ti:${port})`, (err, stdout, stderr) => {
    ;
    [stderr, err].map(err => {
        console.error(err);
        process.exit(1);
    });
    process.exit(0);
});
exports.killPort = killPort;
//# sourceMappingURL=killPort.js.map