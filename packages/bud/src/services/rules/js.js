"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.exclude = exports.test = void 0;
const test = ({ store }) => store.get('patterns.js');
exports.test = test;
const exclude = ({ store }) => store.get('patterns.modules');
exports.exclude = exclude;
const use = ({ build }) => [
    build.items.get('raw'),
];
exports.use = use;
//# sourceMappingURL=js.js.map