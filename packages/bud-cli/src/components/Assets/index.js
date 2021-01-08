"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const Asset_1 = require("./Asset");
const Assets = ({ assets }) => {
    const { col } = ink_use_style_1.useStyle();
    return (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column", width: col(12) }, assets === null || assets === void 0 ? void 0 : assets.map((asset, id) => (bud_support_1.React.createElement(Asset_1.Asset, Object.assign({ key: id }, asset))))));
};
exports.Assets = Assets;
//# sourceMappingURL=index.js.map