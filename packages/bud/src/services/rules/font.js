"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.test = void 0;
const test = ({ store }) => store.get('patterns.font');
exports.test = test;
const use = ({ build }) => [
    build.items.get('file'),
];
exports.use = use;
//# sourceMappingURL=font.js.map