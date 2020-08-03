function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const React = require('react');

const {
  useEffect
} = React;

const {
  useApp,
  useInput
} = require('ink');

const PropTypes = require('prop-types');

const notifier = require('node-notifier');

const useStdOutDimensions = require('ink-use-stdout-dimensions');

const {
  useWebpack
} = require('./hooks/useWebpack');

const {
  useFocusState
} = require('./hooks/useFocusState');

const {
  App
} = require('./components/App');

const {
  Assets
} = require('./components/Assets');

const {
  BrowserSync
} = require('./components/BrowserSync');

const {
  Errors
} = require('./components/Errors/index');

const {
  Warnings
} = require('./components/Warnings/index');

const {
  DevServer
} = require('./components/DevServer');
/**
 * Helper: Successful build
 *
 * @prop {object} build
 * @return {boolean}
 */


const successfulBuild = build => {
  var _build$assets;

  return (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : (_build$assets = build.assets) === null || _build$assets === void 0 ? void 0 : _build$assets.length) > 0;
};
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
    if (successfulBuild(build)) {
      const title = 'Build complete.';
      const message = `${build.assets.length} assets built.`;
      notifier.notify({
        title,
        message
      });
      bud.logger.info({
        name: 'bud.compiler',
        title,
        message
      }, 'Build success notification');
    }
  }, [build === null || build === void 0 ? void 0 : build.percentage, build === null || build === void 0 ? void 0 : build.assets]);
  useEffect(() => {
    const notWatching = !bud.features.enabled('watch') && !bud.features.enabled('hot');
    const complete = build === null || build === void 0 ? void 0 : build.done;

    if (notWatching && complete) {
      bud.logger.info({
        name: 'bud.compiler',
        watch: bud.features.enabled('watch'),
        hot: bud.features.enabled('hot'),
        build: _objectSpread(_objectSpread({}, build), {}, {
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
module.exports = {
  Runner
};