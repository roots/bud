const React = require('react');

const {
  useEffect
} = React;

const {
  useApp,
  useInput,
  Text
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
  bud
}) => {
  var _bud$state2, _bud$state2$features, _bud$state3, _bud$state3$features;

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
    var _bud$state, _bud$state$features;

    !((_bud$state = bud.state) === null || _bud$state === void 0 ? void 0 : (_bud$state$features = _bud$state.features) === null || _bud$state$features === void 0 ? void 0 : _bud$state$features.watch) && (build === null || build === void 0 ? void 0 : build.assets) && (build === null || build === void 0 ? void 0 : build.percentage) && exit();
  });
  const build = useWebpack({
    compiler,
    bud
  });
  useEffect(() => {
    successfulBuild(build) && notifier.notify({
      title: 'Build complete',
      message: `${build.assets.length} assets built.`
    });
  }, [build === null || build === void 0 ? void 0 : build.percentage]);
  const showBrowserSync = !((_bud$state2 = bud.state) === null || _bud$state2 === void 0 ? void 0 : (_bud$state2$features = _bud$state2.features) === null || _bud$state2$features === void 0 ? void 0 : _bud$state2$features.debug) && ((_bud$state3 = bud.state) === null || _bud$state3 === void 0 ? void 0 : (_bud$state3$features = _bud$state3.features) === null || _bud$state3$features === void 0 ? void 0 : _bud$state3$features.browserSync);
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