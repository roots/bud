"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const adapter_1 = __importDefault(require("./adapter"));
const api_1 = __importDefault(require("./api"));
const jsonPalette = (bud) => ({
    bud,
    make: function () {
        this.bud.setPaletteBlacklist = api_1.default;
        this.bud.adapters.add(adapter_1.default);
    },
});
module.exports = jsonPalette;
//# sourceMappingURL=index.js.map