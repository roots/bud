"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const bud_support_1 = require("@roots/bud-support");
const Errors = ({ errors }) => errors.length > 1 ? (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column" },
    bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column", borderColor: "red", borderStyle: "round", marginBottom: 1, padding: 1 }, errors === null || errors === void 0 ? void 0 : errors.map((err, id) => (bud_support_1.React.createElement(bud_support_1.Text, { key: id, wrap: "wrap" }, err)))))) : null;
exports.Errors = Errors;
//# sourceMappingURL=index.js.map