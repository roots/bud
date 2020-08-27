"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dev = void 0;
var chokidar_1 = __importDefault(require("chokidar"));
var __1 = require("..");
var fallback = function (options) { return ({
    host: 'http://localhost',
    port: 3000,
    overlay: true,
    open: true,
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
}); };
var dev = function (_a) {
    var _this = this;
    var _b = _a.defaults, defaults = _b === void 0 ? true : _b, options = __rest(_a, ["defaults"]);
    var specified = function (option) { return options.hasOwnProperty(option); };
    var useDefaults = defaults == true;
    !specified('enabled') &&
        useDefaults &&
        this.features.set('dev', this.inDevelopment);
    !specified('hot') &&
        useDefaults &&
        this.features.set('hot', this.inDevelopment);
    !specified('watch') &&
        useDefaults &&
        this.features.set('watch', this.inDevelopment);
    specified('enabled') && this.features.set('dev', options.enabled);
    specified('watch') &&
        (function () {
            var _a;
            _this.options.set('watch', __spreadArrays(((_a = _this.options.get('watch')) !== null && _a !== void 0 ? _a : []), options.watch));
            _this.features.set('watch', true);
        })();
    specified('chokidar')
        ? this.options.merge('webpack.devServer', __assign({}, options.chokidar))
        : useDefaults &&
            !this.options.get('webpack.devServer.before') &&
            this.options.set('webpack.devServer', __assign(__assign({}, this.options.get('webpack.devServer')), { before: function (app, server) {
                    var _a;
                    chokidar_1["default"].watch((_a = options === null || options === void 0 ? void 0 : options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                        server.sockWrite(server.sockets, 'content-changed');
                    });
                } }));
    specified('hot')
        ? this.options.set('webpack.devServer.hot', this.hooks.filter('api.dev.hot', options.hot))
        : useDefaults &&
            !this.options.has('webpack.devServer.hot') &&
            this.options.set('webpack.devServer.hot', __1.bud.inDevelopment);
    specified('host')
        ? this.options.set('webpack.devServer.host', this.hooks.filter('api.dev.host', options.host))
        : useDefaults &&
            !this.options.has('webpack.devServer.host') &&
            this.options.set('webpack.devServer.host', fallback(this.options).host);
    specified('overlay')
        ? this.options.set('webpack.devServer.overlay', this.hooks.filter('api.dev.overlay', options.overlay))
        : useDefaults &&
            !this.options.has('webpack.devServer.overlay') &&
            this.options.set('webpack.devServer.overlay', fallback(this.options).overlay);
    specified('port')
        ? this.options.set('webpack.devServer.port', this.hooks.filter('api.dev.port', options.port))
        : useDefaults &&
            !this.options.has('webpack.devServer.port') &&
            this.options.set('webpack.devServer.port', fallback(this.options).port);
    specified('open')
        ? this.options.set('webpack.devServer.open', this.hooks.filter('api.dev.open', options.open))
        : useDefaults &&
            !this.options.has('webpack.devServer.open') &&
            this.options.set('webpack.devServer.open', fallback(this.options).open);
    specified('historyApiFallback')
        ? this.options.set('webpack.devServer.historyApiFallback', this.hooks.filter('api.dev.historyApiFallback', options.historyApiFallback))
        : useDefaults &&
            !this.options.has('webpack.devServer.historyApiFallback') &&
            this.options.set('webpack.devServer.historyApiFallback', fallback(this.options).historyApiFallback);
    specified('headers')
        ? this.options.set('webpack.devServer.headers', __assign(__assign({}, this.options.get('webpack.devServer.headers')), this.hooks.filter('api.dev.headers', options.headers)))
        : useDefaults &&
            !this.options.has('webpack.devServer.headers') &&
            this.options.set('webpack.devServer.headers', fallback(this.options).headers);
    specified('writeToDisk')
        ? this.options.set('webpack.devServer.writeToDisk', options.writeToDisk)
        : useDefaults &&
            !this.options.has('webpack.devServer.writeToDisk') &&
            this.options.set('webpack.devServer.writeToDisk', false);
    return this;
};
exports.dev = dev;
//# sourceMappingURL=dev.js.map