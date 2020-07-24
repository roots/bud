const {
  useState,
  useEffect
} = require('react');

const {
  ProgressPlugin
} = require('webpack');
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
  config
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
  useEffect(() => {
    const webpackCallback = (err, stats) => {
      setBuildErrors(err);
      setBuildStats(stats.toJson({
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
        var _config$features;

        setWebpackRunning(true);
        (config === null || config === void 0 ? void 0 : config.mode) == 'development' && !(config === null || config === void 0 ? void 0 : (_config$features = config.features) === null || _config$features === void 0 ? void 0 : _config$features.debug) == true ? compiler.watch({}, webpackCallback) : compiler.run(webpackCallback);
      }
    }
  }, [progressPluginApplied, config === null || config === void 0 ? void 0 : config.mode, compiler]);
  const [assets, setAssets] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    var _buildStats$warnings, _buildStats$errors;

    setAssets(buildStats === null || buildStats === void 0 ? void 0 : buildStats.assets);
    setWarnings((_buildStats$warnings = buildStats === null || buildStats === void 0 ? void 0 : buildStats.warnings) !== null && _buildStats$warnings !== void 0 ? _buildStats$warnings : []);
    setErrors([...(buildErrors !== null && buildErrors !== void 0 ? buildErrors : []), ...((_buildStats$errors = buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors) !== null && _buildStats$errors !== void 0 ? _buildStats$errors : [])]);
  }, [buildStats, buildErrors]);
  return {
    assets,
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