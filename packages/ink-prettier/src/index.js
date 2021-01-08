"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prettier = exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
const Prettier = props => {
    var _a;
    return (bud_support_1.React.createElement(bud_support_1.Box, { marginBottom: 1, flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "flex-start" },
        bud_support_1.React.createElement(bud_support_1.Text, null, bud_support_1.prettier.format(props.children, Object.assign({ parser: (_a = props.parser) !== null && _a !== void 0 ? _a : 'babel' }, props)))));
};
exports.default = Prettier;
exports.Prettier = Prettier;
//# sourceMappingURL=index.js.map