"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var createDomain_1 = __importDefault(require("./createDomain"));
var injectEntrypoints = function (bud) {
    var _a = bud.options.get('webpack'), devServer = _a.devServer, entry = _a.entry;
    var endpoint = createDomain_1["default"](bud) + "/__webpack_hmr";
    var hotClient = "webpack-hot-middleware/client?" + endpoint;
    var hotServer = devServer.hotOnly
        ? 'webpack/hot/only-dev-server'
        : 'webpack/hot/dev-server';
    var toInject = [hotServer, hotClient];
    var prepend = function (entry) {
        if (typeof entry === 'function') {
            return function () { return Promise.resolve(entry()).then(prepend); };
        }
        if (typeof entry === 'object' && !Array.isArray(entry)) {
            var entryClone_1 = {};
            Object.keys(entry).forEach(function (key) {
                entryClone_1[key] = toInject.concat(entry[key]);
            });
            return entryClone_1;
        }
    };
    return prepend(entry);
};
exports["default"] = injectEntrypoints;
//# sourceMappingURL=injectEntrypoints.js.map