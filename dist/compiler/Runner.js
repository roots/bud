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
/**
 * Successful build
 *
 * @prop {object} build
 * @return {boolean}
 */


const successfulBuild = build => {
  var _build$errors, _build$assets;

  return !(build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : (_build$assets = build.assets) === null || _build$assets === void 0 ? void 0 : _build$assets.length) > 0;
};
/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */


const Runner = ({
  compiler,
  webpackConfig,
  config
}) => {
  var _config$state2, _config$state2$featur, _config$state3, _config$state3$featur;

  const [width, height] = useStdOutDimensions();
  const [state, actions] = useFocusState();
  const {
    exit
  } = useApp();
  useInput(input => {
    if (input == 'q') {
      exit();
      process.exit();
    }
  });
  useEffect(() => {
    var _config$state, _config$state$feature;

    !(config === null || config === void 0 ? void 0 : (_config$state = config.state) === null || _config$state === void 0 ? void 0 : (_config$state$feature = _config$state.features) === null || _config$state$feature === void 0 ? void 0 : _config$state$feature.watch) && (build === null || build === void 0 ? void 0 : build.assets) && (build === null || build === void 0 ? void 0 : build.percentage) && exit();
  });
  const build = useWebpack({
    compiler,
    webpackConfig,
    config
  });
  useEffect(() => {
    successfulBuild(build) && notifier.notify({
      title: 'Build complete',
      message: `${build.assets.length} assets built.`
    });
  }, [build === null || build === void 0 ? void 0 : build.percentage]);
  const showBrowserSync = !(config === null || config === void 0 ? void 0 : (_config$state2 = config.state) === null || _config$state2 === void 0 ? void 0 : (_config$state2$featur = _config$state2.features) === null || _config$state2$featur === void 0 ? void 0 : _config$state2$featur.debug) && (config === null || config === void 0 ? void 0 : (_config$state3 = config.state) === null || _config$state3 === void 0 ? void 0 : (_config$state3$featur = _config$state3.features) === null || _config$state3$featur === void 0 ? void 0 : _config$state3$featur.browserSync);
  return /*#__PURE__*/React.createElement(App, {
    width: width,
    height: height,
    build: build,
    state: state,
    config: config
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
  }));
};

Runner.propTypes = {
  compiler: PropTypes.object,
  config: PropTypes.object
};
module.exports = {
  Runner
};