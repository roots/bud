"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const Title = ({ frame, children }) => {
    const { colors } = ink_use_style_1.useStyle();
    return (bud_support_1.React.createElement(bud_support_1.Box, Object.assign({}, (frame !== null && frame !== void 0 ? frame : []), { flexDirection: "column" }),
        bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: colors.primary, color: colors.white }, ` ${children} `)));
};
exports.Title = Title;
//# sourceMappingURL=Title.js.map