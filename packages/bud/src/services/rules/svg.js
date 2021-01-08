"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.test = void 0;
const test = ({ store }) => store.get('patterns.svg');
exports.test = test;
const use = ({ build }) => [
    build.items.get('svg'),
];
exports.use = use;
//# sourceMappingURL=svg.js.map