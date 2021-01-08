"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
const Indicator = ({ active, primary = '#545DD7', secondary = '#6C758F', }) => {
    return (bud_support_1.React.createElement(bud_support_1.Text, { color: active ? primary : secondary },
        "\u29BF",
        '  '));
};
exports.default = Indicator;
exports.Indicator = Indicator;
//# sourceMappingURL=Indicator.js.map