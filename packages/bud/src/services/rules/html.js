"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.test = void 0;
const test = ({ store }) => store.get('patterns.html');
exports.test = test;
const use = ({ build }) => [
    build.items.get('raw'),
];
exports.use = use;
//# sourceMappingURL=html.js.map