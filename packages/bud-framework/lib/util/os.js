"use strict";
exports.__esModule = true;
exports.os = void 0;
var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var os = {
    isWin: isWin,
    isMac: isMac
};
exports.os = os;
//# sourceMappingURL=os.js.map