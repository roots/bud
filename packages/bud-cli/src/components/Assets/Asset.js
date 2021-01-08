"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const bud_support_1 = require("@roots/bud-support");
const Indicator_1 = require("../UI/Indicator");
const ink_use_style_1 = require("@roots/ink-use-style");
const Asset = ({ size, name, isOverSizeLimit, emitted, chunkNames, chunks, }) => {
    const { col, colors } = ink_use_style_1.useStyle();
    return (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: 'row', justifyContent: 'space-between' },
        bud_support_1.React.createElement(bud_support_1.Box, { width: col(7) },
            bud_support_1.React.createElement(bud_support_1.Text, { wrap: "truncate-end", color: emitted ? colors.foreground : colors.faded },
                bud_support_1.React.createElement(Indicator_1.Indicator, { active: emitted }),
                name,
                ' ')),
        bud_support_1.React.createElement(bud_support_1.Box, { width: col(3), alignItems: "flex-end", justifyContent: "flex-end" },
            bud_support_1.React.createElement(bud_support_1.Text, { wrap: "truncate", color: colors.accent }, chunkNames.toString())),
        bud_support_1.React.createElement(bud_support_1.Box, { width: col(2), alignItems: "flex-end", justifyContent: "flex-end" },
            bud_support_1.React.createElement(bud_support_1.Text, { wrap: "truncate-end", color: colors.success },
                size / 1000,
                "kb"))));
};
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map