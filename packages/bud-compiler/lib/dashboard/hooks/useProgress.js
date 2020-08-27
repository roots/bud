"use strict";
exports.__esModule = true;
exports.useProgress = void 0;
var react_1 = require("react");
var webpack_1 = require("webpack");
var useProgress = function (bud) {
    var _a = react_1.useState(null), progress = _a[0], setProgress = _a[1];
    var _b = react_1.useState(0), percentage = _b[0], setPercentage = _b[1];
    var _c = react_1.useState(null), message = _c[0], setMessage = _c[1];
    react_1.useEffect(function () {
        if (!progress) {
            var newProgressPlugin = new webpack_1.ProgressPlugin({
                activeModules: true,
                modules: true,
                handler: function (percentage, message) {
                    setPercentage(percentage);
                    setMessage(message);
                }
            });
            setProgress(newProgressPlugin);
        }
    }, []);
    return { progress: progress, percentage: percentage, message: message };
};
exports.useProgress = useProgress;
//# sourceMappingURL=useProgress.js.map