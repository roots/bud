"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
/**
 * Publish
 */
const Publish = ({ file }) => (bud_support_1.React.createElement(bud_support_1.Box, { display: "flex", margin: 1, justifyContent: "flex-start", flexDirection: "column" },
    bud_support_1.React.createElement(bud_support_1.Box, { display: "flex", margin: 1, justifyContent: "flex-start" },
        bud_support_1.React.createElement(bud_support_1.Text, null,
            bud_support_1.React.createElement(bud_support_1.Text, { color: "green", bold: true }, file),
            ' ',
            "copied to",
            ' ',
            bud_support_1.React.createElement(bud_support_1.Text, { color: "green", bold: true },
                process.cwd(),
                "/publish/",
                file)))));
exports.default = Publish;
//# sourceMappingURL=Publish.js.map