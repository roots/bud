"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const bud_support_1 = require("@roots/bud-support");
const Error = ({ title = 'Error', body }) => (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column" },
    bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column", borderColor: "red", borderStyle: "round", marginBottom: 1, padding: 1 },
        bud_support_1.React.createElement(bud_support_1.Text, { bold: true, wrap: "wrap" }, title),
        bud_support_1.React.createElement(bud_support_1.Text, { wrap: "wrap" }, body))));
exports.Error = Error;
//# sourceMappingURL=Error.js.map