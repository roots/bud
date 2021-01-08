"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const bud_support_1 = require("@roots/bud-support");
const Bar_1 = require("./Bar");
function Progress({ progress, bounds, col, colors, }) {
    const labelMax = 5;
    const barMax = Math.min(Math.floor(bounds.width - labelMax), bounds.width);
    return (bud_support_1.React.createElement(bud_support_1.Box, { display: 'flex', width: col(12), flexDirection: 'row' },
        bud_support_1.React.createElement(bud_support_1.Box, { width: labelMax },
            bud_support_1.React.createElement(bud_support_1.Text, null, progress === null || progress === void 0 ? void 0 :
                progress.percentage,
                '')),
        bud_support_1.React.createElement(Bar_1.Bar, { maxWidth: barMax, backgroundColor: "none", colors: [colors.primary, colors.primaryAlt], percent: progress === null || progress === void 0 ? void 0 : progress.decimal })));
}
exports.Progress = Progress;
//# sourceMappingURL=index.js.map