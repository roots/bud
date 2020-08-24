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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Dashboard = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var ink_use_stdout_dimensions_1 = __importDefault(require("ink-use-stdout-dimensions"));
/**
 * Hooks
 */
var useWebpack_1 = require("./hooks/useWebpack");
var useFocusState_1 = require("./hooks/useFocusState");
/**
 * Dashboard components
 */
var App_1 = require("./components/App");
var Assets_1 = require("./components/Assets");
var BrowserSync_1 = require("./components/BrowserSync");
var Errors_1 = require("./components/Errors");
var Warnings_1 = require("./components/Warnings");
var DevServer_1 = require("./components/DevServer");
var Dashboard = function (_a) {
    var bud = _a.bud;
    var _b = ink_use_stdout_dimensions_1["default"](), width = _b[0], height = _b[1];
    var _c = useFocusState_1.useFocusState(), state = _c[0], actions = _c[1];
    var build = useWebpack_1.useWebpack(bud);
    var exit = ink_1.useApp().exit;
    /**
     * Quits application when called.
     */
    var quit = function () {
        bud.logger.info({ name: 'bud.compiler' }, 'Quitting application.');
        exit();
        bud.util.terminate();
        process.exit();
    };
    ink_1.useInput(function (input) {
        if (input == 'q') {
            bud.logger.info({ name: 'bud.compiler', input: input }, 'User requested to close application.');
            quit();
        }
    });
    /**
     * Run OS level notification when build complete
     */
    react_1.useEffect(function () {
        if (build === null || build === void 0 ? void 0 : build.success) {
            var title = bud.hooks.filter('compiler.notify.success.title', 'Build complete.');
            bud.util.notify({ title: title });
            bud.logger.info({ name: 'bud.compiler', title: title }, 'Build success notification');
        }
    }, [build === null || build === void 0 ? void 0 : build.success]);
    react_1.useEffect(function () {
        var notWatching = !bud.features.enabled('watch') && !bud.features.enabled('hot');
        if (notWatching && (build === null || build === void 0 ? void 0 : build.done)) {
            bud.logger.info({
                name: 'bud.compiler',
                watch: bud.features.enabled('watch'),
                hot: bud.features.enabled('hot'),
                build: __assign(__assign({}, build), { assets: build.assets.map(function (asset) { return asset.name; }) })
            }, 'application determined to be finished based on state. quitting.');
            quit();
        }
    });
    var showBrowserSync = !bud.features.enabled('debug') &&
        bud.features.enabled('browserSync');
    return (react_1["default"].createElement(App_1.App, { width: width, height: height, build: build, state: state, bud: bud },
        react_1["default"].createElement(Assets_1.Assets, { actions: actions, build: build }),
        react_1["default"].createElement(Errors_1.Errors, { actions: actions, build: build }),
        react_1["default"].createElement(Warnings_1.Warnings, { actions: actions, build: build }),
        showBrowserSync && react_1["default"].createElement(BrowserSync_1.BrowserSync, { actions: actions }),
        react_1["default"].createElement(DevServer_1.DevServer, { actions: actions, build: build })));
};
exports.Dashboard = Dashboard;
//# sourceMappingURL=index.js.map