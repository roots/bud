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
import React, { useEffect } from 'react';
import { useApp, useInput } from 'ink';
import PropTypes from 'prop-types';
import notifier from 'node-notifier';
import useStdOutDimensions from 'ink-use-stdout-dimensions';
import { useWebpack } from './hooks/useWebpack';
import { useFocusState } from './hooks/useFocusState';
import { App } from './components/App';
import { Assets } from './components/Assets';
import { BrowserSync } from './components/BrowserSync';
import { Errors } from './components/Errors/index';
import { Warnings } from './components/Warnings/index';
import { DevServer } from './components/DevServer';
/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
var Runner = function (_a) {
    var bud = _a.bud;
    var _b = useStdOutDimensions(), width = _b[0], height = _b[1];
    var _c = useFocusState(), state = _c[0], actions = _c[1];
    var build = useWebpack(bud);
    var exit = useApp().exit;
    /**
     * Quits application when called.
     */
    var quit = function () {
        bud.logger.info({ name: 'bud.compiler' }, 'Quitting application.');
        exit();
        bud.util.terminate();
        process.exit();
    };
    useInput(function (input) {
        if (input == 'q') {
            bud.logger.info({ name: 'bud.compiler', input: input }, 'User requested to close application.');
            quit();
        }
    });
    /**
     * Run OS level notification when build complete
     */
    useEffect(function () {
        if (build === null || build === void 0 ? void 0 : build.success) {
            var title = bud.hooks.filter('compiler.notify.success.title', 'Build complete.');
            notifier.notify({ title: title });
            bud.logger.info({ name: 'bud.compiler', title: title }, 'Build success notification');
        }
    }, [build === null || build === void 0 ? void 0 : build.success]);
    useEffect(function () {
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
    var showBrowserSync = !bud.features.enabled('debug') && bud.features.enabled('browserSync');
    return (<App width={width} height={height} build={build} state={state} bud={bud}>
      <Assets width={width} actions={actions} build={build}/>
      <Errors actions={actions} build={build}/>
      <Warnings actions={actions} build={build}/>
      {showBrowserSync && <BrowserSync actions={actions}/>}
      <DevServer actions={actions} build={build}/>
    </App>);
};
Runner.propTypes = {
    compiler: PropTypes.object,
    bud: PropTypes.object
};
export { Runner };
//# sourceMappingURL=Runner.js.map