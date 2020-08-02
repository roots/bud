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
  const [width, height] = useStdOutDimensions();
  const [state, actions] = useFocusState();
  const {
    exit
  } = useApp();

  const quit = () => {
    exit();
    bud.dump();
    bud.util.termiante();
    process.exit();
  };

  useInput(input => {
    if (input == 'q') {
      quit();
    }
  });
  useEffect(() => {
    var _build$assets2;

    ;
    (!bud.features.enabled('watch') || !bud.features.enabled('hot')) && (build === null || build === void 0 ? void 0 : (_build$assets2 = build.assets) === null || _build$assets2 === void 0 ? void 0 : _build$assets2.length) > 1 && (build === null || build === void 0 ? void 0 : build.percentage) == 1 && quit();
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