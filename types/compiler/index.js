"use strict";
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Runner = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var node_notifier_1 = __importDefault(require("node-notifier"));
var ink_use_stdout_dimensions_1 = __importDefault(require("ink-use-stdout-dimensions"));
var useWebpack_1 = require("./hooks/useWebpack");
var useFocusState_1 = require("./hooks/useFocusState");
var App_1 = require("./components/App");
var Assets_1 = require("./components/Assets");
var BrowserSync_1 = require("./components/BrowserSync");
var index_1 = require("./components/Errors/index");
var index_2 = require("./components/Warnings/index");
/**
 * Successful build
 *
 * @prop {object} build
 * @return {boolean}
 */
var successfulBuild = function (build) {
    var _a, _b;
    return !((_a = build === null || build === void 0 ? void 0 : build.errors) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        (build === null || build === void 0 ? void 0 : build.percentage) == 1 &&
        ((_b = build === null || build === void 0 ? void 0 : build.assets) === null || _b === void 0 ? void 0 : _b.length) > 0;
};
/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
var Runner = function (_a) {
    var _b, _c;
    var compiler = _a.compiler, config = _a.config;
    var _d = ink_use_stdout_dimensions_1["default"](), width = _d[0], height = _d[1];
    var _e = useFocusState_1.useFocusState(), state = _e[0], actions = _e[1];
    var exit = ink_1.useApp().exit;
    ink_1.useInput(function (input) {
        if (input == 'q') {
            exit();
            process.exit();
        }
    });
    react_1.useEffect(function () {
        var _a;
        !((_a = config === null || config === void 0 ? void 0 : config.features) === null || _a === void 0 ? void 0 : _a.watch) && (build === null || build === void 0 ? void 0 : build.assets) && (build === null || build === void 0 ? void 0 : build.percentage) &&
            exit();
    });
    var build = useWebpack_1.useWebpack({ compiler: compiler, config: config });
    react_1.useEffect(function () {
        successfulBuild(build) &&
            node_notifier_1["default"].notify({
                title: 'Build complete',
                message: build.assets.length + " assets built."
            });
    }, [build === null || build === void 0 ? void 0 : build.percentage]);
    var showBrowserSync = !((_b = config === null || config === void 0 ? void 0 : config.features) === null || _b === void 0 ? void 0 : _b.debug) && ((_c = config === null || config === void 0 ? void 0 : config.features) === null || _c === void 0 ? void 0 : _c.browserSync);
    return (<App_1.App width={width} height={height} build={build} state={state} config={config}>
      <Assets_1.Assets width={width} actions={actions} build={build}/>
      <index_1.Errors actions={actions} build={build}/>
      <index_2.Warnings actions={actions} build={build}/>
      {showBrowserSync && <BrowserSync_1.BrowserSync actions={actions}/>}
    </App_1.App>);
};
exports.Runner = Runner;
Runner.propTypes = {
    compiler: prop_types_1["default"].object,
    config: prop_types_1["default"].object
};
