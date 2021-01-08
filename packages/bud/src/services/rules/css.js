"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.exclude = exports.test = void 0;
const test = ({ store }) => store.get('patterns.css');
exports.test = test;
const exclude = ({ store }) => store.get('patterns.modules');
exports.exclude = exclude;
const use = bud => [
    bud.mode.is('production')
        ? bud.build.items.get('mini-css')
        : bud.build.items.get('style'),
    bud.build.items.get('css'),
];
exports.use = use;
//# sourceMappingURL=css.js.map