function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  useEffect,
  useState
} = require('react');

const WDS = require('webpack-dev-server');

const chokidar = require('chokidar');

const useDevServer = (compiler, webpackConfig, config) => {
  const [devServer, setDevServer] = useState(null);
  useEffect(() => {
    if (!devServer && compiler && (config === null || config === void 0 ? void 0 : config.mode) == 'development') {
      const options = _objectSpread({
        inline: true,

        before(app, server) {
          chokidar.watch(config.state.options.devWatch[0]).on('all', function () {
            server.sockWrite(server.sockets, 'content-changed');
          });
        }

      }, config.state.options.dev);

      WebpackDevServer.addDevServerEntrypoints(config, options);
      const devServer = new WebpackDevServer(compiler, options);
      setDevServer(devServer.listen(5000, 'localhost', () => {
        console.log('dev server listening on port 5000');
      }));
    }
  }, [devServer, setDevServer]);
  return [devServer];
};

module.exports = {
  useDevServer
};