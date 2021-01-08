"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const bud_support_1 = require("@roots/bud-support");
const Indicator_1 = require("../UI/Indicator");
const useFocus_1 = require("../../hooks/useFocus");
const ink_use_style_1 = require("@roots/ink-use-style");
const Item = ({ name, color, display }) => {
    const [focus] = useFocus_1.useFocus();
    const { colors } = ink_use_style_1.useStyle();
    return (bud_support_1.React.createElement(bud_support_1.Box, null,
        bud_support_1.React.createElement(Indicator_1.Indicator, { active: focus.active == name, primary: color }),
        bud_support_1.React.createElement(bud_support_1.Text, { color: focus.active == name
                ? color !== null && color !== void 0 ? color : colors.primary : colors.faded },
            ' ',
            display,
            '   ')));
};
exports.Item = Item;
//# sourceMappingURL=Item.js.map