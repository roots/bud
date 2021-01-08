"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.test = void 0;
const test = ({ store }) => store.get('patterns.svg');
exports.test = test;
const use = ({ build }) => [
    build.items.get('@svgr'),
];
exports.use = use;
//# sourceMappingURL=rule.js.map