"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nav = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const Item_1 = require("./Item");
const Nav = () => {
    const { ctx, colors } = ink_use_style_1.useStyle();
    const items = [
        {
            name: 'assets',
            display: 'Assets',
            color: colors.primary,
        },
        {
            name: 'errors',
            display: 'Errors',
            color: colors.error,
        },
        {
            name: 'warnings',
            display: 'Warnings',
            color: colors.warning,
        },
        {
            name: 'dev',
            display: 'Dev',
            color: colors.primary,
        },
    ];
    return (bud_support_1.React.createElement(bud_support_1.Box, { justifyContent: 'flex-start', flexDirection: ctx(['column', 'row']) }, items.map((item, id) => (bud_support_1.React.createElement(Item_1.Item, Object.assign({ key: id }, item))))));
};
exports.Nav = Nav;
//# sourceMappingURL=index.js.map