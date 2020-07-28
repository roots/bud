/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 150);
/******/ })
/************************************************************************/
/******/ ({

/***/ 145:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

const {
  useState,
  useEffect,
  useMemo
} = __webpack_require__(145);

const {
  ProgressPlugin
} = __webpack_require__(83);

const browserSync = __webpack_require__(151);

const webpackDevMiddleware = __webpack_require__(152);

const webpackHotMiddleware = __webpack_require__(153);

const makeMiddleware = (compiler, bud) => [webpackDevMiddleware(compiler, {
  headers: bud.state.options.dev.headers,
  publicPath: bud.state.paths.public || '/',
  stats: {
    version: true,
    hash: true,
    time: true,
    assets: true,
    errors: true,
    warnings: true
  }
}), webpackHotMiddleware(compiler, {
  log: msg => {
    console.log(msg);
  }
})];

const hotSyncServer = (bud, compiler, callback) => {
  return browserSync.init({
    proxy: {
      target: 'bud-sandbox.valet',
      ws: true
    },
    logLevel: 'silent',
    reloadOnRestart: true,
    injectFileTypes: ['js', 'css'],
    open: true,
    middleware: makeMiddleware(compiler, bud),
    injectChanges: true,
    watchOptions: {
      ignoreInitial: true
    },
    files: [bud.src('**/*.js'), bud.src('**/*.js'), bud.src('*.css'), bud.src('**/*.css')]
  }, callback);
};
/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */


const useProgress = () => {
  const [progressPlugin, setProgressPlugin] = useState();
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    !progressPlugin && setProgressPlugin(new ProgressPlugin({
      activeModules: true,
      modules: true,

      handler(percentage, message) {
        setPercentage(percentage);
        setMessage(message);
      }

    }));
  }, []);
  return {
    progressPlugin,
    percentage,
    message
  };
};
/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */


const useWebpack = ({
  compiler,
  bud
}) => {
  const {
    progressPlugin,
    percentage,
    message
  } = useProgress();
  const [progressPluginApplied, setProgressPluginApplied] = useState(null);
  useEffect(() => {
    if (progressPlugin) {
      progressPlugin.apply(compiler);
      setProgressPluginApplied(true);
    }
  }, [progressPlugin, compiler]);
  const [buildStats, setBuildStats] = useState({});
  const [buildErrors, setBuildErrors] = useState([]);
  const [webpackRunning, setWebpackRunning] = useState(null);
  const [devServer, setDevServer] = useState(null);
  useEffect(() => {
    const webpackCallback = (err, stats) => {
      setBuildErrors(err);
      setBuildStats(stats === null || stats === void 0 ? void 0 : stats.toJson({
        version: true,
        hash: true,
        time: true,
        assets: true,
        errors: true,
        warnings: true
      }));
    };

    if (progressPluginApplied) {
      if (!webpackRunning) {
        setWebpackRunning(true);
        bud.featureEnabled('watch') ? compiler.watch({}, webpackCallback) : compiler.run(webpackCallback);
      }
    }
  }, [progressPluginApplied, bud, compiler]);
  const [assets, setAssets] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.assets) && setAssets(buildStats.assets);
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.warnings) && setWarnings(buildStats.warnings);
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors) && setErrors(buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors);
  }, [buildStats, buildErrors]);
  useMemo(() => {
    if (webpackRunning && bud.featureEnabled('hot') && !devServer && (buildStats || buildErrors)) {
      hotSyncServer(bud, compiler, (err, bs) => {
        setDevServer(bs.name);
      });
    }
  }, [webpackRunning, devServer]);
  return {
    assets,
    devServer,
    errors,
    hash: buildStats === null || buildStats === void 0 ? void 0 : buildStats.hash,
    time: buildStats === null || buildStats === void 0 ? void 0 : buildStats.time,
    warnings,
    percentage,
    message
  };
};

module.exports = {
  useWebpack
};

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

module.exports = require("browser-sync");

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ })

/******/ });