"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
const Title_1 = require("./Title");
const Screen = ({ title, display = true, children, }) => (bud_support_1.React.createElement(bud_support_1.Box, { display: display ? 'flex' : 'none', marginTop: 0, marginBottom: 1, marginLeft: 1, justifyContent: "flex-start", flexDirection: "column" },
    title && bud_support_1.React.createElement(Title_1.Title, null, title),
    children));
exports.default = Screen;
//# sourceMappingURL=Screen.js.map