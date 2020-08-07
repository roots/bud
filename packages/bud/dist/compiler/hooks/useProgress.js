import { useState, useEffect } from 'react';
import { ProgressPlugin } from 'webpack';
/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */
var useProgress = function (bud) {
    var _a = useState(), progressPlugin = _a[0], setProgressPlugin = _a[1];
    var _b = useState(0), percentage = _b[0], setPercentage = _b[1];
    var _c = useState(null), message = _c[0], setMessage = _c[1];
    useEffect(function () {
        if (!progressPlugin) {
            setProgressPlugin(new ProgressPlugin({
                activeModules: true,
                modules: true,
                handler: function (percentage, message) {
                    setPercentage(percentage);
                    setMessage(message);
                }
            }));
            bud.logger.info({ name: 'bud.compiler' }, 'progress plugin created.');
        }
    }, []);
    return { progressPlugin: progressPlugin, percentage: percentage, message: message };
};
export { useProgress };
//# sourceMappingURL=useProgress.js.map