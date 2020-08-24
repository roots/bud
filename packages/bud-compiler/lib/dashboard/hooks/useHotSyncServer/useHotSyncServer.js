"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useHotSyncServer = void 0;
var react_1 = require("react");
var browser_sync_1 = __importDefault(require("browser-sync"));
var makeMiddleware_1 = require("./makeMiddleware");
var useHotSyncServer = function (bud) {
    var hot = react_1.useState(bud.features.enabled('hot'))[0];
    var target = react_1.useState(bud.options.get('devServer.host'))[0];
    var open = react_1.useState(bud.options.get('devServer.open'))[0];
    var files = react_1.useState(bud.options.get('watch'))[0];
    var _a = react_1.useState(null), hotSyncServer = _a[0], setHotSyncServer = _a[1];
    var _b = react_1.useState(null), devStats = _b[0], setDevStats = _b[1];
    react_1.useEffect(function () {
        if (!hotSyncServer && hot) {
            var options = {
                hot: hot,
                proxy: {
                    target: target,
                    ws: true
                },
                reload: false,
                reloadOnRestart: false,
                open: open,
                middleware: makeMiddleware_1.makeMiddleware(bud, setDevStats),
                injectChanges: true,
                injectFileTypes: bud.options
                    .get('resolve.extensions')
                    .map(function (ext) { return ext.replace('.', ''); }),
                watchOptions: {
                    ignoreInitial: false
                },
                files: files
            };
            setHotSyncServer(browser_sync_1["default"].create().init(options));
        }
    }, [hotSyncServer, setHotSyncServer, hot, open, files, target]);
    return [hotSyncServer, devStats];
};
exports.useHotSyncServer = useHotSyncServer;
//# sourceMappingURL=useHotSyncServer.js.map