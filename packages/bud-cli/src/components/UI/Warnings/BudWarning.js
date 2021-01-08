"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
const BudWarning = () => (bud_support_1.React.createElement(bud_support_1.Box, { marginTop: 1, flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "flex-start" },
    bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: "red", color: "white" },
        "You currently have",
        ' ',
        bud_support_1.React.createElement(bud_support_1.Text, { bold: true }, "runtimeChunks (inline manifest)"),
        " enabled in development mode. This will probably break hot module reloading. Recommendation is to move this into a production only block in your config file."),
    bud_support_1.React.createElement(bud_support_1.Text, null, " "),
    bud_support_1.React.createElement(bud_support_1.Text, null, "Example:"),
    bud_support_1.React.createElement(bud_support_1.Text, null, ''),
    bud_support_1.React.createElement(bud_support_1.Spacer, null)));
exports.default = BudWarning;
//# sourceMappingURL=BudWarning.js.map