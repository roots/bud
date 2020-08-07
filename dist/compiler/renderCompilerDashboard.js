import webpack from 'webpack';
import React from 'react';
import { render } from 'ink';
import { Runner } from './Runner';
/**
 * Inject webpack middleware on all entrypoints.
 */
var injectHot = function (_a) {
    var webpackConfig = _a.webpackConfig, overlay = _a.overlay, reload = _a.reload, logger = _a.logger;
    var client = "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=" + reload + "&overlay=" + overlay;
    Object.keys(webpackConfig.entry).forEach(function (entry) {
        webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry]);
        logger.info({
            name: 'bud.compiler',
            value: webpackConfig.entry[entry]
        }, "injecting hot middleware");
    });
    return webpackConfig;
};
var renderCompilerDashboard = function (bud, webpackConfig) {
    bud.compiler = bud.features.enabled('hot')
        ? webpack(injectHot({
            webpackConfig: webpackConfig,
            overlay: bud.options.get('dev').overlay ? true : true,
            reload: bud.options.get('dev').reload ? true : true,
            logger: bud.logger
        }))
        : webpack(webpackConfig);
    bud.logger.info({
        name: 'bud.compiler'
    }, "compiler attached to bud");
    var props = { bud: bud };
    var application = React.createElement(Runner, props);
    /** 🚀 */
    render(application);
};
export { renderCompilerDashboard };
//# sourceMappingURL=renderCompilerDashboard.js.map