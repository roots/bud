"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = __importDefault(require("./api"));
const purgecss = () => ({
    make: function () {
        this.bud.purge = api_1.default;
    },
});
module.exports = purgecss;
//# sourceMappingURL=index.js.map