/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import React, { useEffect } from 'react';
import { useApp, useInput } from 'ink';
import { objectSpread2 as _objectSpread2 } from '../../../../_virtual/_rollupPluginBabelHelpers.js';
import PropTypes from 'prop-types';
import notifier from 'node-notifier';
import useStdOutDimensions from 'ink-use-stdout-dimensions';
import { useWebpack } from './hooks/useWebpack.js';
import { useFocusState } from './hooks/useFocusState.js';
import { App } from './components/App.js';
import { Assets } from './components/Assets.js';
import { BrowserSync } from './components/BrowserSync.js';
import { Errors } from './components/Errors/index.js';
import { Warnings } from './components/Warnings/index.js';
import { DevServer } from './components/DevServer.js';

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */

const Runner = ({
  bud
}) => {
  const [width, height] = useStdOutDimensions();
  const [state, actions] = useFocusState();
  const build = useWebpack(bud);
  const {
    exit
  } = useApp();
  /**
   * Quits application when called.
   */

  const quit = () => {
    bud.logger.info({
      name: 'bud.compiler'
    }, 'Quitting application.');
    exit();
    bud.util.terminate();
    process.exit();
  };

  useInput(input => {
    if (input == 'q') {
      bud.logger.info({
        name: 'bud.compiler',
        input
      }, 'User requested to close application.');
      quit();
    }
  });
  /**
   * Run OS level notification when build complete
   */

  useEffect(() => {
    if (build === null || build === void 0 ? void 0 : build.success) {
      const title = bud.hooks.filter('compiler.notify.success.title', 'Build complete.');
      notifier.notify({
        title
      });
      bud.logger.info({
        name: 'bud.compiler',
        title
      }, 'Build success notification');
    }
  }, [build === null || build === void 0 ? void 0 : build.success]);
  useEffect(() => {
    const notWatching = !bud.features.enabled('watch') && !bud.features.enabled('hot');

    if (notWatching && (build === null || build === void 0 ? void 0 : build.done)) {
      bud.logger.info({
        name: 'bud.compiler',
        watch: bud.features.enabled('watch'),
        hot: bud.features.enabled('hot'),
        build: _objectSpread2(_objectSpread2({}, build), {}, {
          assets: build.assets.map(asset => asset.name)
        })
      }, 'application determined to be finished based on state. quitting.');
      quit();
    }
  });
  const showBrowserSync = !bud.features.enabled('debug') && bud.features.enabled('browserSync');
  return /*#__PURE__*/React.createElement(App, {
    width: width,
    height: height,
    build: build,
    state: state,
    bud: bud
  }, /*#__PURE__*/React.createElement(Assets, {
    width: width,
    actions: actions,
    build: build
  }), /*#__PURE__*/React.createElement(Errors, {
    actions: actions,
    build: build
  }), /*#__PURE__*/React.createElement(Warnings, {
    actions: actions,
    build: build
  }), showBrowserSync && /*#__PURE__*/React.createElement(BrowserSync, {
    actions: actions
  }), /*#__PURE__*/React.createElement(DevServer, {
    actions: actions,
    build: build
  }));
};

Runner.propTypes = {
  compiler: PropTypes.object,
  bud: PropTypes.object
};

export { Runner };
