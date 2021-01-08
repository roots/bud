"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const Console_1 = require("./Console");
const Debug = ({ bud, }) => {
    var _a;
    const { col, ctx } = ink_use_style_1.useStyle();
    return ((_a = bud === null || bud === void 0 ? void 0 : bud.compiler) === null || _a === void 0 ? void 0 : _a.instance) ? (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: ctx(['row', 'column']), width: col(12), justifyContent: "space-between" },
        bud_support_1.React.createElement(Console_1.Console, null))) : (bud_support_1.React.createElement(bud_support_1.Box, null));
};
exports.Debug = Debug;
//# sourceMappingURL=Debug.js.map