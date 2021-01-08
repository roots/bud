"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.test = void 0;
const test = ({ store }) => store.get('patterns.image');
exports.test = test;
const use = ({ build }) => [
    build.items.get('file'),
];
exports.use = use;
//# sourceMappingURL=image.js.map