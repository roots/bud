'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var path = require('path');
var path__default = _interopDefault(path);
var chokidar = _interopDefault(require('chokidar'));
var prettier = require('prettier');
var cliHighlight = require('cli-highlight');
var fsExtra = require('fs-extra');
var pino = _interopDefault(require('pino'));
var yargs = require('yargs');
var dotenv = _interopDefault(require('dotenv'));
var BrowserSyncWebpackPlugin = _interopDefault(require('browser-sync-webpack-plugin'));
var cleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = _interopDefault(require('copy-webpack-plugin'));
var webpack = require('webpack');
var webpack__default = _interopDefault(webpack);
var FixStyleOnlyEntriesPlugin = _interopDefault(require('webpack-fix-style-only-entries'));
var MiniCssExtractPlugin = _interopDefault(require('mini-css-extract-plugin'));
var ManifestPlugin = _interopDefault(require('webpack-manifest-plugin'));
var TerserPlugin = _interopDefault(require('terser-webpack-plugin'));
var WriteFilePlugin = _interopDefault(require('write-file-webpack-plugin'));
var React = require('react');
var React__default = _interopDefault(React);
var ink = require('ink');
var PropTypes = _interopDefault(require('prop-types'));
var notifier = _interopDefault(require('node-notifier'));
var useStdOutDimensions = _interopDefault(require('ink-use-stdout-dimensions'));
var browserSyncLibrary = _interopDefault(require('browser-sync'));
var webpackDevMiddleware = _interopDefault(require('webpack-dev-middleware'));
var webpackHotMiddleware = _interopDefault(require('webpack-hot-middleware'));
var blacklist = _interopDefault(require('blacklist'));
var patchConsole = _interopDefault(require('patch-console'));
var lodash = require('lodash');

var alias = function (options) {
    this.options.set('resolve.alias', tslib.__assign(tslib.__assign({}, this.options.get('resolve.alias')), this.hooks.filter('api.alias', options)));
    return this;
};

var auto = function (options) {
    var _this = this;
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.set('auto', tslib.__assign(tslib.__assign({}, _this.options.get('auto')), (_a = {}, _a[handle] = key, _a)));
        });
    });
    return this;
};

var babel = function (options) {
    this.features.enable('babel');
    this.options.set('babel', tslib.__assign(tslib.__assign({}, this.options.get('babel')), this.hooks.filter('api.babel', options)));
    return this;
};

var bundle = function (name, entries) {
    var _a;
    this.util.usedExt(entries, this);
    this.options.set('entry', tslib.__assign(tslib.__assign({}, this.options.get('entry')), this.hooks.filter('api.bundle.filter', (_a = {},
        _a["" + name] = entries,
        _a))));
    return this;
};

var compile = function () {
    this.hooks.filter('bud.compiler.filter', this.compiler).buildConfig().compile();
};

var config = function () {
    return this.hooks.filter('bud.compiler.filter', this.compiler).buildConfig().config;
};

var copy = function (from, to) {
    this.options.set('copy.patterns', tslib.__spreadArrays(this.options.get('copy.patterns'), [
        {
            from: from,
            to: to !== null && to !== void 0 ? to : path.join(this.paths.get('dist'), from),
        },
    ]));
    return this;
};

var copyAll = function (from, to) {
    this.options.set('copy.patterns', tslib.__spreadArrays(this.options.get('copy.patterns'), [
        this.hooks.filter('bud.copyAll.filter', {
            from: '**/*',
            context: from,
            to: to ? to : path.join(this.paths.get('dist'), from),
            globOptions: {
                ignore: '.*',
            },
            noErrorOnMissing: true,
        }),
    ]));
    return this;
};

var dist = function (path$1) {
    return path$1 ? path.join(this.paths.get('dist'), path$1) : this.paths.get('dist');
};

var distPath = function (dir) {
    this.paths.set('dist', this.hooks.filter('api.distPath', path.join(this.paths.get('project'), dir)));
    return this;
};

var devtool = function (devtool) {
    this.options.set('devtool', devtool);
    return this;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
var globby = require('globby');
var glob = function (name, files) {
    var entry = this.options.get('entry');
    /**
     * Glob matching files.
     */
    var included = globby.sync(this.src(files), {
        expandDirectories: true,
    });
    /**
     * Enable support for matching extensions
     */
    this.util.usedExt(included, this);
    /**
     * Add matching files as indviduated entrypoints.
     */
    included.forEach(function (match) {
        var _a;
        entry = tslib.__assign(tslib.__assign({}, entry), (_a = {}, _a[name] = match, _a));
    });
    this.options.set('entry', entry);
    return this;
};

var hash = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.set('hash', enabled);
    return this;
};

var hot = function (options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    this.features.set('hot', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : this.inDevelopment);
    (options === null || options === void 0 ? void 0 : options.watch) &&
        this.options.set('watch', tslib.__spreadArrays(this.options.get('watch'), options.watch));
    var devServer = this.options.has('devServer')
        ? this.options.get('devServer')
        : {};
    var proxyAll = devServer.proxy && devServer.proxy['**'] ? devServer.proxy['**'] : {};
    var chokidarHandler = (_b = options === null || options === void 0 ? void 0 : options.chokidar) !== null && _b !== void 0 ? _b : {
        before: function (app, server) {
            var _a;
            chokidar.watch((_a = options === null || options === void 0 ? void 0 : options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                server.sockWrite(server.sockets, 'content-changed');
            });
        },
    };
    this.options.set('devServer', this.hooks.filter('api.hot', tslib.__assign(tslib.__assign(tslib.__assign({}, devServer), chokidarHandler), { hot: (_d = (_c = options === null || options === void 0 ? void 0 : options.enabled) !== null && _c !== void 0 ? _c : devServer.enabled) !== null && _d !== void 0 ? _d : true, host: (_f = (_e = options === null || options === void 0 ? void 0 : options.host) !== null && _e !== void 0 ? _e : devServer.host) !== null && _f !== void 0 ? _f : 'localhost', overlay: (_h = (_g = options === null || options === void 0 ? void 0 : options.overlay) !== null && _g !== void 0 ? _g : devServer.overlay) !== null && _h !== void 0 ? _h : true, port: (_k = (_j = options === null || options === void 0 ? void 0 : options.port) !== null && _j !== void 0 ? _j : devServer.port) !== null && _k !== void 0 ? _k : 3000, secure: (_m = (_l = options === null || options === void 0 ? void 0 : options.secure) !== null && _l !== void 0 ? _l : devServer.secure) !== null && _m !== void 0 ? _m : false, open: (_p = (_o = options === null || options === void 0 ? void 0 : options.open) !== null && _o !== void 0 ? _o : devServer.open) !== null && _p !== void 0 ? _p : true, historyApiFallback: (_r = (_q = options === null || options === void 0 ? void 0 : options.historyApiFallback) !== null && _q !== void 0 ? _q : devServer.historyApiFallback) !== null && _r !== void 0 ? _r : true, headers: tslib.__assign(tslib.__assign({}, ((_s = this.options.get('headers')) !== null && _s !== void 0 ? _s : [])), ((_t = options === null || options === void 0 ? void 0 : options.headers) !== null && _t !== void 0 ? _t : [])), proxy: tslib.__assign(tslib.__assign(tslib.__assign({}, ((_u = devServer.proxy) !== null && _u !== void 0 ? _u : [])), { '**': tslib.__assign(tslib.__assign({}, (proxyAll !== null && proxyAll !== void 0 ? proxyAll : [])), { target: (_w = (_v = options === null || options === void 0 ? void 0 : options.host) !== null && _v !== void 0 ? _v : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.target) !== null && _w !== void 0 ? _w : 'http://localhost', secure: (_y = (_x = options === null || options === void 0 ? void 0 : options.secure) !== null && _x !== void 0 ? _x : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.secure) !== null && _y !== void 0 ? _y : devServer.secure, changeOrigin: (_0 = (_z = options === null || options === void 0 ? void 0 : options.changeOrigin) !== null && _z !== void 0 ? _z : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.changeOrigin) !== null && _0 !== void 0 ? _0 : true, port: (_2 = (_1 = options === null || options === void 0 ? void 0 : options.port) !== null && _1 !== void 0 ? _1 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.port) !== null && _2 !== void 0 ? _2 : devServer.port, headers: tslib.__assign(tslib.__assign({}, this.options.get('devServer.headers')), ((_4 = (_3 = options === null || options === void 0 ? void 0 : options.headers) !== null && _3 !== void 0 ? _3 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.headers) !== null && _4 !== void 0 ? _4 : [])) }) }), ((_5 = options === null || options === void 0 ? void 0 : options.proxy) !== null && _5 !== void 0 ? _5 : [])) })));
    return this;
};

var manifest = function (options) {
    var _a, _b, _c, _d;
    this.features.set('manifest', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true);
    this.options.set('manifest.name', (_b = options === null || options === void 0 ? void 0 : options.name) !== null && _b !== void 0 ? _b : 'manifest.json');
    this.options.set('manifest.publicPath', (_c = options === null || options === void 0 ? void 0 : options.publicPath) !== null && _c !== void 0 ? _c : null);
    this.options.set('manifest.writeToFileEmit', (_d = options === null || options === void 0 ? void 0 : options.writeToFileEmit) !== null && _d !== void 0 ? _d : true);
    return this;
};

var runtimeManifest = function (args) {
    var _a, _b;
    this.features.set('runtimeChunk', (_a = args === null || args === void 0 ? void 0 : args.enabled) !== null && _a !== void 0 ? _a : true);
    this.options.set('optimization.runtimeChunk.name', (_b = args === null || args === void 0 ? void 0 : args.name) !== null && _b !== void 0 ? _b : this.options.get('optimization.runtimeChunk.name'));
    return this;
};

var map = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.set('sourceMap', enabled !== null && enabled !== void 0 ? enabled : true);
    return this;
};

var mini = function (enable) {
    if (enable === void 0) { enable = true; }
    this.features.set('minify', enable);
    return this;
};

var postCss = function (_a) {
    var _b;
    var enabled = _a.enabled, options = tslib.__rest(_a, ["enabled"]);
    this.features.set('postCss', enabled !== null && enabled !== void 0 ? enabled : true);
    if (this.features.enabled('postCss')) {
        this.options.set('postcss', tslib.__assign(tslib.__assign(tslib.__assign({}, this.options.get('postCss')), options), { plugins: tslib.__spreadArrays(((_b = options.plugins) !== null && _b !== void 0 ? _b : []), this.options.get('postCss').plugins) }));
    }
    return this;
};

var preset = function (presetKey) {
    return require(this.presets.get(presetKey));
};

var project = function (path$1) {
    return path$1 ? path.join(this.paths.get('project'), path$1) : this.paths.get('project');
};

var projectPath = function (dir) {
    this.paths.set('project', dir);
    return this;
};

var publicPath = function (dir) {
    this.paths.set('public', dir);
    return this;
};

var splitting = function (enabled) {
    this.logger.info({ name: 'bud.api', "function": 'bud.splitting', enabled: enabled }, "bud.splitting called");
    this.features.set('splitting', enabled !== null && enabled !== void 0 ? enabled : true);
    return this;
};

var src = function (path) {
    var srcDir = this.paths.get('src');
    return path ? this.fs.path.join(srcDir, path) : srcDir;
};

var srcPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.srcPath', dir: dir }, "bud.srcPath called");
    var setPath = path.join(this.paths.get('project'), dir);
    /**
     * If set, CLI arguments take precendence over config.
     */
    !this.args.get('src') && this.paths.set('src', setPath);
    return this;
};

var sync = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = _a.options;
    this.features.set('browserSync', enabled !== null && enabled !== void 0 ? enabled : true);
    this.options.merge('browserSync', options);
    return this;
};

var target = function (target) {
    this.options.set('target', this.hooks.filter('api.target', target));
    return this;
};

var terser = function (options) {
    if (options) {
        this.options.set('terser', tslib.__assign(tslib.__assign({}, this.options.get('terser')), options));
    }
    return this;
};

var use = function (plugins) {
    var controller = this.plugins.controller(this);
    plugins.map(function (plugin) {
        controller.build(plugin);
    });
    return this;
};

var vendor = function (options) {
    this.features.enable('vendor');
    options &&
        this.options.set('optimization.splitChunks.cacheGroup.vendor', tslib.__assign(tslib.__assign({}, this.options.get('optimization.splitChunks.cacheGroup.vendor')), options));
    return this;
};

var watch = function (options) {
    (options === null || options === void 0 ? void 0 : options.enabled) && this.features.enable('watch');
    (options === null || options === void 0 ? void 0 : options.paths) &&
        this.options.set('watch', this.hooks.filter('api.watch', options.paths));
    return this;
};

/**
 * Bud.Bud export
 */
var api = {
    alias: alias,
    auto: auto,
    babel: babel,
    bundle: bundle,
    compile: compile,
    config: config,
    copy: copy,
    copyAll: copyAll,
    devtool: devtool,
    dist: dist,
    distPath: distPath,
    glob: glob,
    hash: hash,
    hot: hot,
    manifest: manifest,
    map: map,
    mini: mini,
    postCss: postCss,
    preset: preset,
    project: project,
    projectPath: projectPath,
    publicPath: publicPath,
    runtimeManifest: runtimeManifest,
    splitting: splitting,
    src: src,
    srcPath: srcPath,
    sync: sync,
    target: target,
    terser: terser,
    use: use,
    vendor: vendor,
    watch: watch,
};

var hooks = function (logger) { return ({
    logger: logger,
    /**
     * Registered hooks.
     */
    registered: {},
    /**
     * Init hooks.
     */
    init: function (bud) {
        this.bud = bud;
        return this;
    },
    /**
     * Make a bud hook
     */
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({
            fn: fn,
            fired: false,
        });
    },
    /**
     * Get all bud hook entries.
     */
    entries: function () {
        return Object.entries(this.registered);
    },
    /**
     * Register a function as a bud hook.
     */
    on: function (name, callback) {
        this.logger.info({ name: name, callback: callback.name }, 'filter callback defined');
        if (!this.registered[name]) {
            this.registered[name] = [];
        }
        this.registered[name].push(callback);
        return this;
    },
    filter: function (name, value) {
        this.logger.info({ name: name, value: value }, name + " filter defined");
        if (!this.registered[name]) {
            return value;
        }
        this.registered[name].forEach(function (hook) {
            value = hook(value);
        });
        return value;
    },
}); };

/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
var shortCircuit = function () {
    var seen = new WeakSet();
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value) || key == 'UI') {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

/**
 * Dump a prettified, syntax-highlighted object
 */
var dump = function (obj, prettierOptions) {
    var prettierConfig = prettierOptions !== null && prettierOptions !== void 0 ? prettierOptions : { parser: 'json' };
    var normalizedString = JSON.stringify(obj, shortCircuit());
    var prettifiedString = prettier.format(normalizedString, prettierConfig);
    var highlightedConfig = cliHighlight.highlight(prettifiedString);
    console.log(highlightedConfig);
};

/**
 * Fabs: like noop but fab.
 */
var fab = {
    "false": function () { return false; },
    "true": function () { return true; },
    undefined: function () { return undefined; },
    "null": function () { return null; },
};

var projectRoot = require.main.paths[0]
    .split('node_modules')[0]
    .slice(0, -1);

/**
 * Terminate CLI execution
 */
var terminate = function (options) {
    var exit = function (code) {
        options.dump ? process.abort() : process.exit(code);
    };
    return function () { return function (err) {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack);
        }
        setTimeout(exit, options.timeout).unref();
    }; };
};

var processHandler = function (bud) {
    process.title = bud.hooks.filter('node_process_title', 'bud-cli');
    bud.logger.info({ name: 'process', value: process.title }, "title set");
    process.env.BABEL_ENV = bud.mode;
    bud.logger.info({ name: 'process', value: process.env.BABEL_ENV }, "BABEL_ENV set");
    process.env.NODE_ENV = bud.mode;
    bud.logger.info({ name: 'process', value: process.env.NODE_ENV }, "NODE_ENV set");
    var unhandledRejectionHandler = bud.hooks.filter('node_unhandled_rejection_handler', function (error) {
        bud.logger.error({ name: 'process', value: error }, "unhandled rejection error");
        process.exitCode = 1;
        process.nextTick(function () {
            bud.util.terminate();
        });
    });
    process.on('unhandledRejection', unhandledRejectionHandler);
};

var fs = {
    path: path__default,
    existsSync: fsExtra.existsSync,
};

var usedExt = function (entries, bud) {
    entries.forEach(function (entry) {
        var ext = entry.split('.')[entry.split('.').length - 1];
        !bud.options.get('resolve.extensions').includes(ext) &&
            bud.options.set('resolve.extensions', tslib.__spreadArrays(bud.options.get('resolve.extensions'), [
                "." + ext,
            ]));
    });
};

var log = yargs.argv.log;
var destination = (yargs.argv === null || yargs.argv === void 0 ? void 0 : yargs.argv.log) && typeof yargs.argv.log == 'boolean' ? false : log;
var logger = pino({
    base: null,
    enabled: yargs.argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
        colorize: !destination ? true : false,
    },
}, destination);

var util = {
    fs: fs,
    dump: dump,
    shortCircuit: shortCircuit,
    fab: fab,
    projectRoot: projectRoot,
    processHandler: processHandler,
    terminate: terminate,
    usedExt: usedExt,
};

var configFiles = [
    {
        name: 'babel',
        filename: 'babel.config.js',
    },
    {
        name: 'postcss',
        filename: 'postcss.config.js',
    },
    {
        name: 'js',
        filename: 'jsconfig.json',
    },
];
var configs = function (paths) {
    var repository = {};
    configFiles.forEach(function (_a) {
        var name = _a.name, filename = _a.filename;
        var projectPath = path.join(paths.get('project'), filename);
        if (fsExtra.existsSync(projectPath)) {
            repository[name] = projectPath;
        }
    });
    return repository;
};

var features = {
    /**
     * Default enabled
     */
    dashboard: true,
    clean: true,
    manifest: true,
    postCss: true,
    /**
     * Opt-in
     */
    browserSync: false,
    hash: false,
    hot: false,
    minify: false,
    splitting: true,
    vendor: false,
    runtimeChunk: false,
    overlay: false,
    sourceMap: false,
    watch: false,
    debug: false,
};

var babelFallback = {
    presets: [],
    plugins: [],
};
var babel$1 = function (configs) {
    return configs.has('babel') ? configs.require('babel') : babelFallback;
};
var browserSync = function (flags) { return ({
    host: flags.has('host') ? flags.get('host') : 'localhost',
    port: flags.get('port') ? flags.get('port') : 3000,
    proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
    online: false,
    open: false,
}); };
var copy$1 = { patterns: [] };
var postCss$1 = function (configs) {
    var fallback = { plugins: [] };
    return configs.has('postCss') ? configs.require('postCss') : fallback;
};
var target$1 = 'web';
/**
 * Options container.
 */
var options = {
    copy: copy$1,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    devtool: 'source-map',
    filenameTemplate: {
        hashed: '[name].[hash:8]',
        "default": '[name]',
    },
    manifest: {
        name: 'vendor.js',
    },
    optimization: {
        runtimeChunk: {
            name: function (entrypoint) { return "runtime/" + entrypoint.name; },
        },
        splitChunks: {
            cacheGroup: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor.js',
                    chunks: 'all',
                    priority: -20,
                },
            },
        },
    },
    patterns: [],
    postCss: {},
    resolve: {
        alias: false,
        extensions: ['.css', '.js', '.json', '.svg'],
    },
    splitting: {
        maxChunks: null,
    },
    target: target$1,
    terser: {
        terserOptions: {
            parse: {
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
            },
            mangle: {
                safari10: true,
            },
            output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
            },
        },
        cache: true,
        parallel: true,
    },
    stats: {
        version: true,
        hash: true,
        assets: true,
        errors: true,
        warnings: true,
    },
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};

/**
 * Current working dir
 */
var cwd = process.cwd();
/**
 * Bud framework dir.
 */
var framework = path.resolve(__dirname, '../');
/**
 * Src arg
 */
var ensureStr = function (possibleStr) {
    return possibleStr ? possibleStr : '';
};
/**
 * Paths repo.
 */
var paths = {
    cwd: cwd,
    project: cwd,
    framework: framework,
    src: yargs.argv['src'] ? path.join(cwd, ensureStr(yargs.argv['src'])) : path.join(cwd),
    dist: yargs.argv['dist'] ? path.join(cwd, ensureStr(yargs.argv['dist'])) : path.join(cwd),
    public: yargs.argv['public'] ? ensureStr(yargs.argv['public']) : '/',
};

var args = function (env) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return ({
        log: yargs.argv['log'],
        hot: yargs.argv['hot'],
        watch: yargs.argv['watch'],
        level: (_a = yargs.argv['level']) !== null && _a !== void 0 ? _a : 'info',
        mode: (_c = (_b = yargs.argv['env']) !== null && _b !== void 0 ? _b : env.get('APP_ENV')) !== null && _c !== void 0 ? _c : 'none',
        host: (_e = (_d = yargs.argv['host']) !== null && _d !== void 0 ? _d : env.get('APP_DEV_HOST')) !== null && _e !== void 0 ? _e : false,
        port: (_g = (_f = yargs.argv['port']) !== null && _f !== void 0 ? _f : env.get('APP_DEV_PORT')) !== null && _g !== void 0 ? _g : null,
        proxy: (_j = (_h = yargs.argv['proxy']) !== null && _h !== void 0 ? _h : env.get('APP_DEV_PROXY')) !== null && _j !== void 0 ? _j : null,
        src: (_l = (_k = yargs.argv['src']) !== null && _k !== void 0 ? _k : env.get('APP_SRC')) !== null && _l !== void 0 ? _l : null,
        dist: (_o = (_m = yargs.argv['dist']) !== null && _m !== void 0 ? _m : env.get('APP_DIST')) !== null && _o !== void 0 ? _o : null,
        feature: (_q = (_p = yargs.argv['feature']) !== null && _p !== void 0 ? _p : env.get('APP_BUILD_FEATURE')) !== null && _q !== void 0 ? _q : null,
    });
};

var flags = {
    log: yargs.argv.hasOwnProperty('log'),
    hot: yargs.argv.hasOwnProperty('hot'),
    watch: yargs.argv.hasOwnProperty('watch'),
};

var cli = {
    args: args,
    flags: flags,
};

var env = function (paths) {
    var _a;
    return ((_a = dotenv.config({
        path: path.join(paths.get('project'), '.env'),
    }).parsed) !== null && _a !== void 0 ? _a : {});
};

var browserSync$1 = function () { return ({
    mergeOptions: function () {
        return this.bud.options.get('browserSync');
    },
    make: function () {
        return new BrowserSyncWebpackPlugin(this.options);
    },
    when: function () {
        return (this.bud.features.enabled('browserSync') && !this.bud.features.enabled('hot'));
    },
}); };

var cleanWebpack = function () { return ({
    make: function () {
        return new cleanWebpackPlugin.CleanWebpackPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('clean');
    },
}); };

var copy$2 = function () { return ({
    mergeOptions: function () {
        if (this.bud.options.get('copy').patterns.length > 0) {
            return this.bud.options.get('copy');
        }
    },
    make: function () {
        return new CopyWebpackPlugin(this.options);
    },
    when: function () {
        return this.options;
    },
}); };

var define = function () { return ({
    mergeOptions: function () {
        return this.bud.options.get('env');
    },
    make: function () {
        return new webpack.DefinePlugin(this.options);
    },
    when: function () {
        return this.options;
    },
}); };

var fixStyleOnlyEntries = function () { return ({
    options: {
        silent: true,
    },
    make: function () {
        if (this.bud.features.enabled('hot')) {
            this.options.ignore = 'webpack-hot-middleware';
        }
        return new FixStyleOnlyEntriesPlugin(this.options);
    },
    when: function () {
        return (this.bud.options.get('resolve.extensions').includes('.css') ||
            this.bud.options.get('resolve.extensions').includes('.scss') ||
            this.bud.options.get('resolve.extensions').includes('.sass'));
    },
}); };

var hotModuleReplacement = function () { return ({
    setOptions: function () {
        return this.bud.options.get('hotModuleReplacement');
    },
    make: function () {
        return new webpack.HotModuleReplacementPlugin();
    },
    when: function () {
        return this.bud.features.enabled('hot');
    },
}); };

var LimitChunkCountPlugin = webpack.optimize.LimitChunkCountPlugin;
var limitChunkCount = function () { return ({
    setOptions: function () {
        var enabled = this.bud.features.enabled('splitting');
        var chunks = this.bud.options.get('splitting').maxChunks;
        if (!enabled) {
            return {
                maxChunks: 1,
            };
        }
        if (chunks) {
            return {
                maxChunks: chunks,
            };
        }
        return null;
    },
    make: function () {
        return new LimitChunkCountPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('optimize') && this.options;
    },
}); };

var miniCssExtract = function () { return ({
    setOptions: function () {
        return {
            hmr: this.bud.features.enabled('hot'),
            filename: this.bud.features.enabled('hash')
                ? this.bud.options.get('filenameTemplate').hashed + ".css"
                : this.bud.options.get('filenameTemplate')["default"] + ".css",
        };
    },
    make: function () {
        return new MiniCssExtractPlugin(this.options);
    },
    when: function () {
        return (this.bud.options.get('resolve.extensions').includes('.css') ||
            this.bud.options.get('resolve.extensions').includes('.scss') ||
            this.bud.options.get('resolve.extensions').includes('.sass'));
    },
}); };

var manifest$1 = function () { return ({
    setOptions: function () {
        var _a, _b, _c, _d;
        return {
            publicPath: (_b = (_a = this.bud.options.get('manifest.publicPath')) !== null && _a !== void 0 ? _a : this.bud.paths.public) !== null && _b !== void 0 ? _b : '/',
            filename: (_c = this.bud.options.get('manifest.name')) !== null && _c !== void 0 ? _c : 'manifest.json',
            writeToFileEmit: (_d = this.bud.options.get('manifest.writeToFileEmit')) !== null && _d !== void 0 ? _d : true,
        };
    },
    make: function () {
        return new ManifestPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('manifest');
    },
}); };

var provide = function () { return ({
    setOptions: function () {
        return this.bud.options.get('auto');
    },
    make: function () {
        return new webpack.ProvidePlugin(this.options);
    },
    when: function () {
        return this.bud.options.has('auto');
    },
}); };

var terser$1 = function (bud) { return ({
    bud: bud,
    setOptions: function () {
        var terser = bud.options.get('terser');
        return terser;
    },
    make: function () {
        return new TerserPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('minify');
    },
}); };

var writeFile = function () { return ({
    make: function () {
        return new WriteFilePlugin();
    },
    when: function () {
        return true;
    },
}); };

var plugins = [];
var adapters = [
    browserSync$1,
    cleanWebpack,
    copy$2,
    define,
    fixStyleOnlyEntries,
    hotModuleReplacement,
    manifest$1,
    miniCssExtract,
    provide,
    limitChunkCount,
    terser$1,
    writeFile,
];

var patterns = {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
    scss: /\.scss$/,
    scssModule: /\.module\.scss$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    svg: /\.svg$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    vendor: /node_modules/,
    image: /\.(png|svg|jpg|gif)$/,
};

/**
 * PostCSS config.
 */
var postCss$2 = {
    plugins: [require('postcss-import'), require('autoprefixer')],
};

/**
 * @roots/babel-preset-wp
 */
var babelWp = (() => any => ({
  presets: [require('@babel/preset-env'), require('@babel/preset-react')],
  plugins: [require('@babel/plugin-syntax-dynamic-import'), require('@babel/plugin-proposal-object-rest-spread'), require('@babel/plugin-transform-runtime')]
}));

var _a;
/**
 * Preset configurations for common webpack plugins.
 */
var presets = (_a = {
        postcss: {
            config: postCss$2,
            file: path__default.join(__dirname, 'repositories/presets/postcss'),
        }
    },
    _a['babel-wp'] = {
        config: babelWp(),
        file: path__default.join(__dirname, 'repositories/presets/babel/preset-wp'),
    },
    _a);

var uses = {
    babel: function (bud) {
        return bud.hooks.filter('webpack.module.babel', {
            loader: bud.hooks.filter('webpack.module.babel.loader', bud.loaders.get('babel')),
            options: bud.hooks.filter('webpack.module.babel.options', tslib.__assign({ cacheDirectory: bud.hooks.filter('webpack.module.babel.options.cacheDirectory', true), cacheCompression: bud.hooks.filter('webpack.module.babel.options.cacheCompression', true) }, bud.options.get('babel'))),
        });
    },
    file: function (bud) { return ({
        loader: bud.loaders.get('file'),
        options: {
            name: '[path][name].[ext]',
        },
    }); },
    miniCss: function (bud) {
        return bud.hooks.filter('webpack.modules.miniCss', {
            loader: bud.hooks.filter('webpack.modules.miniCss.loader', bud.loaders.get('miniCss')),
            options: bud.hooks.filter('webpack.modules.miniCss.options', {
                hot: bud.hooks.filter('webpack.modules.miniCss.loader.hot', bud.features.enabled('hot')),
            }),
        });
    },
    css: function (bud) {
        return bud.hooks.filter('webpack.modules.css', {
            loader: bud.hooks.filter('webpack.modules.css.loader', bud.loaders.get('css')),
        });
    },
    resolveUrl: function (bud) {
        return bud.hooks.filter('webpack.modules.resolveurl', {
            loader: bud.hooks.filter('webpack.modules.resolveurl.loader', bud.loaders.get('resolveUrl')),
            options: bud.hooks.filter('webpack.module.resolveurl.options', {
                sourceMap: bud.features.enabled('sourceMap'),
                debug: true,
            }),
        });
    },
    postCss: function (bud) {
        return bud.hooks.filter('webpack.module.postcss', {
            loader: bud.hooks.filter('webpack.module.postcss.loader', bud.loaders.get('postCss')),
            options: bud.hooks.filter('webpack.module.postcss.options', tslib.__assign({ ident: bud.hooks.filter('webpack.module.postcss.options.ident', 'postcss') }, bud.options.get('postCss'))),
        });
    },
    style: function (bud) {
        return bud.hooks.filter('webpack.module.style', {
            loader: bud.hooks.filter('webpack.module.style.loader', bud.loaders.get('style')),
        });
    },
};

var js = function (bud) {
    return bud.hooks.filter('webpack.module.rules.js', {
        test: bud.hooks.filter('webpack.module.rules.js.test', bud.patterns.get('js')),
        exclude: bud.hooks.filter('webpack.module.rules.js.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.js.use', [uses.babel(bud)]),
    });
};

var css = function (bud) {
    return bud.hooks.filter('webpack.module.rules.css', {
        test: bud.hooks.filter('webpack.module.rules.css.test', bud.patterns.get('css')),
        exclude: bud.hooks.filter('webpack.module.rules.css.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.css.use', [
            uses.miniCss(bud),
            uses.css(bud),
            uses.resolveUrl(bud),
            uses.postCss(bud),
        ]),
    });
};

var font = function (bud) {
    return bud.hooks.filter('webpack.module.rules.font', {
        test: bud.hooks.filter('bud.module.rules.font.test', bud.patterns.get('font')),
        use: bud.hooks.filter('bud.module.rules.font.use', [uses.file(bud)]),
    });
};

var image = function (bud) {
    return bud.hooks.filter('webpack.module.rules.image', {
        test: bud.hooks.filter('webpack.module.rules.image.test', bud.patterns.get('image')),
        use: bud.hooks.filter('webpack.module.rules.image.use', [uses.file(bud)]),
    });
};

var svg = function (bud) {
    return bud.hooks.filter('webpack.module.rules.svg', {
        test: bud.hooks.filter('webpack.module.rules.svg.test', bud.patterns.get('svg')),
        use: bud.hooks.filter('webpack.module.rules.svg.use', [
            bud.loaders.get('svgr'),
            bud.loaders.get('url'),
        ]),
    });
};

var loaders = {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    miniCss: MiniCssExtractPlugin.loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader'),
};

var rules = [js, css, font, image, svg];

var repositories = {
    configs: configs,
    features: features,
    options: options,
    loaders: loaders,
    paths: paths,
    cli: cli,
    env: env,
    adapters: adapters,
    patterns: patterns,
    rules: rules,
    uses: uses,
    plugins: plugins,
    presets: presets,
};

var entry = function (bud) {
    return bud.hooks.filter('webpack.entry', {
        entry: bud.options.get('entry'),
    });
};

var devServer = function (bud) {
    return bud.hooks.filter('webpack.devServer', {
        devServer: bud.options.get('devServer'),
    });
};

var externals = function (bud) {
    return bud.hooks.filter('webpack.externals', {
        externals: bud.options.get('externals'),
    });
};

var general = function (bud) {
    var _a;
    return ({
        context: bud.hooks.filter('webpack.context', bud.paths.get('project')),
        devtool: bud.hooks.filter('webpack.devtool', (_a = bud.options.get('devtool')) !== null && _a !== void 0 ? _a : false),
        mode: bud.hooks.filter('webpack.mode', bud.mode),
        node: bud.hooks.filter('webpack.node', bud.options.get('node')),
        stats: bud.hooks.filter('webpack.stats', bud.options.get('stats')),
        target: bud.hooks.filter('webpack.target', bud.options.get('target')),
        watch: bud.hooks.filter('webpack.watch', bud.features.enabled('watch')),
    });
};

var rules$1 = function (bud) {
    return bud.hooks.filter('webpack.module', {
        module: {
            rules: bud.rules.repository.map(function (rule) { return rule(bud); }),
        },
    });
};

/**
 * Webpack optimization
 */
var optimization = function (bud) {
    return bud.hooks.filter('webpack.optimization', {
        optimization: tslib.__assign(tslib.__assign({}, (bud.features.enabled('runtimeManifest')
            ? {
                runtimeChunk: bud.hooks.filter('webpack.optimization.runtimeChunk', bud.options.get('optimization.runtimeChunk.name')
                    ? {
                        name: function (entrypoint) { return "runtime/" + entrypoint.name; },
                    }
                    : false),
            }
            : {})), { splitChunks: bud.hooks.filter('webpack.optimization.splitChunks', bud.features.enabled('splitChunks')
                ? bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups', {
                    cacheGroups: {
                        vendor: {
                            test: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.test', bud.options.get('optimization.splitChunks.cacheGroups.test')),
                            name: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.name', bud.options.get('optimization.splitChunks.cacheGroups.name')),
                            chunks: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.chunks', bud.options.get('optimization.splitChunks.cacheGroups.chunks')),
                            priority: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.priority', bud.options.get('optimization.splitChunks.cacheGroups.priority')),
                        },
                    },
                })
                : false), minimize: bud.hooks.filter('webpack.optimization.minimize', bud.features.enabled('minify')), removeAvailableModules: bud.hooks.filter('webpack.optimization.removeAvailableModules', false), removeEmptyChunks: bud.hooks.filter('webpack.optimization.removeEmptyChunks', false), moduleIds: bud.hooks.filter('webpack.optimization.moduleIds', 'hashed') }),
    });
};

var output = function (bud) {
    return bud.hooks.filter('webpack.output', {
        output: {
            path: bud.hooks.filter('webpack.output.path', bud.paths.get('dist')),
            publicPath: bud.hooks.filter('webpack.output.publicPath', bud.paths.get('public')),
            filename: bud.hooks.filter('webpack.output.filename', bud.features.enabled('hash')
                ? bud.options.get('filenameTemplate').hashed + ".js"
                : bud.options.get('filenameTemplate')["default"] + ".js"),
        },
    });
};

var webpackResolve = function (bud) {
    return bud.hooks.filter('webpack.resolve', {
        resolve: {
            alias: bud.hooks.filter('webpack.resolve.alias', bud.options.get('resolve.alias')),
            extensions: bud.hooks.filter('webpack.resolve.extensions', bud.options.get('resolve.extensions')),
            modules: bud.hooks.filter('webpack.resolve.modules', [
                bud.paths.get('src'),
                path.join(bud.paths.get('project'), 'node_modules'),
                path.join(bud.paths.get('framework'), 'node_modules'),
            ]),
        },
    });
};

var plugins$1 = function (bud) {
    return bud.hooks.filter('webpack.plugins', {
        plugins: bud.adapters
            .entries()
            .map(function (adapter) {
            return bud.hooks.filter("webpack.plugins." + adapter.name, bud.adapters.controller(bud).build(adapter));
        })
            .filter(function (adapter) { return adapter; }),
    });
};

var builders = [
    devServer,
    entry,
    general,
    rules$1,
    externals,
    output,
    optimization,
    plugins$1,
    webpackResolve,
];
var build = function (bud) {
    var builderReducer = function (acc, curr) { return (tslib.__assign(tslib.__assign({}, (acc !== null && acc !== void 0 ? acc : {})), curr(bud))); };
    return builders.reduce(builderReducer, {});
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */

const useProgress = bud => {
  const [progressPlugin, setProgressPlugin] = React.useState();
  const [percentage, setPercentage] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  React.useEffect(() => {
    if (!progressPlugin) {
      setProgressPlugin(new webpack.ProgressPlugin({
        activeModules: true,
        modules: true,

        handler(percentage, message) {
          setPercentage(percentage);
          setMessage(message);
        }

      }));
      bud.logger.info({
        name: 'bud.compiler'
      }, 'progress plugin created.');
    }
  }, []);
  return {
    progressPlugin,
    percentage,
    message
  };
};

const browserSync$2 = browserSyncLibrary.create();

const makeMiddleware = (bud, setDevStats) => {
  const devMiddlewareOptions = {
    headers: bud.options.get('devServer.headers'),
    logger: bud.logger,
    loglevel: 'trace',
    publicPath: bud.paths.get('public'),
    writeToDisk: false,
    reload: false,
    reporter: (middlewareOptions, reporterOptions) => {
      (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.stats) && setDevStats(reporterOptions.stats.toJson({
        version: true,
        hash: true,
        time: true,
        assets: true,
        errors: true,
        warnings: true,
        chunks: false,
        modules: false,
        entrypoints: false,
        assetsByChunkName: false,
        logging: false,
        children: false,
        namedChunkGroups: false
      }));
    }
  };
  bud.logger.info({
    name: 'bud.compiler',
    options: devMiddlewareOptions
  }, 'making dev server middleware from options');
  const devMiddleware = webpackDevMiddleware(bud.compiler, devMiddlewareOptions);
  const hotMiddleware = webpackHotMiddleware(bud.compiler, {
    reload: false,
    heartbeat: 2000
  });
  return [devMiddleware, hotMiddleware];
};

const useHotSyncServer = bud => {
  const [hot] = React.useState(bud.features.enabled('hot'));
  const [target] = React.useState(bud.options.get('devServer.host'));
  const [open] = React.useState(bud.options.get('devServer.open'));
  const [files] = React.useState(bud.options.get('watch'));
  const [hotSyncServer, setHotSyncServer] = React.useState(null);
  const [devStats, setDevStats] = React.useState(null);
  React.useEffect(() => {
    if (!hotSyncServer && hot) {
      const options = {
        hot,
        proxy: {
          target,
          ws: true
        },
        logLevel: 'silent',
        reload: false,
        reloadOnRestart: false,
        open,
        middleware: makeMiddleware(bud, setDevStats),
        injectChanges: true,
        injectFileTypes: bud.options.get('resolve.extensions').map(ext => ext.replace('.', '')),
        watchOptions: {
          ignoreInitial: false
        },
        files
      };
      setHotSyncServer(browserSync$2.init(options));
      bud.logger.info({
        name: 'bud.compiler',
        options,
        hot
      }, 'using browserSync as hot sync server');
    }
  }, [hotSyncServer, setHotSyncServer, hot, open, files, target]);
  React.useEffect(() => {
    hotSyncServer && bud.logger.info({
      name: 'bud.compiler'
    }, 'hot sync server initialized');
  }, [hotSyncServer]);
  return [hotSyncServer, devStats];
};

/**
 * Hook: useWebpack
 *
 * @prop {Bud} bud
 */

const useWebpack = bud => {
  /**
   * Query bud for mode settings.
   */
  const [hot] = React.useState(bud.features.enabled('hot'));
  const [watch] = React.useState(bud.features.enabled('watch'));
  /**
   * Webpack callback
   *
   * This is fired when webpack finishes each round of compilation.
   *
   * This callback is not utilized when running in hot mode. That is
   * handled in the useHotSyncServer hook and is managed by webpack
   * dev server middleware.
   */

  const webpackCallback = (err, stats) => {
    const results = {};
    /**
     * Add webpack compiler errors to state.
     */

    if (err) {
      results.error = err;
      bud.logger.error({
        name: 'bud.compiler',
        err
      }, 'webpack compiler callback generated build errors');
    }
    /**
     * Add webpack compiler stats to state
     */


    if (stats) {
      results.stats = stats.toJson({
        version: true,
        hash: true,
        time: true,
        assets: true,
        errors: true,
        warnings: true,
        chunks: false,
        modules: false,
        entrypoints: false,
        assetsByChunkName: false,
        logging: false,
        children: false,
        namedChunkGroups: false
      });
      bud.logger.info({
        name: 'bud.compiler',
        assets: results.stats.assets.map(asset => asset.name)
      }, 'webpack compiler callback generated prototypal build stats');
    }

    setBuild(results);
  };
  /**
   * Add progress plugin to state.
   */


  const {
    progressPlugin,
    percentage,
    message
  } = useProgress(bud);
  const [progressPluginApplied, setProgressPluginApplied] = React.useState(null);
  React.useEffect(() => {
    if (progressPlugin) {
      progressPlugin.apply(bud.compiler);
      setProgressPluginApplied(true);
      bud.logger.info({
        name: 'bud.compiler'
      }, 'progress plugin applied');
    }
  }, [progressPlugin, bud]);
  /**
   * Run webpack compiler and log output to state.
   */

  const [build, setBuild] = React.useState({});
  const [webpackRunning, setWebpackRunning] = React.useState(null);
  React.useEffect(() => {
    if (progressPluginApplied && !webpackRunning) {
      /** Hot builds are handled by WDS middleware */
      if (hot) {
        return;
      }
      /**
       * Run compiler in watch mode if bud watch feature is enabled.
       */


      if (watch) {
        bud.logger.info({
          name: 'bud.compiler',
          hot,
          watch,
          progressPluginApplied,
          webpackRunning
        }, 'starting compiler in watch mode');
        bud.compiler.watch({}, webpackCallback);
        /**
         * Otherwise, run the vanilla compiler.
         */
      } else {
        bud.logger.info({
          name: 'bud.compiler',
          hot,
          watch,
          progressPluginApplied,
          webpackRunning
        }, 'starting compiler in run mode');
        bud.compiler.run(webpackCallback);
      }

      setWebpackRunning(true);
    }
  }, [progressPluginApplied, webpackRunning, hot, watch, bud]);
  /**
   * Assets are generated by webpack's core compiler when not in hot mode.
   * This is set to the build state variable above.
   *
   * When in hot mode assets are generated by WDS middleware slotted onto
   * BrowserSync. This is set to the devStats state variable
   * in the useHotSyncServer hook. That call happens below.
   *
   * Only one of them will run at a time.
   */

  /**
   * Stats state variables consumed by application.
   */

  const [assets, setAssets] = React.useState([]);
  const [warnings, setWarnings] = React.useState([]);
  const [errors, setErrors] = React.useState([]);
  const [hash, setHash] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [hotSyncServer, devStats] = useHotSyncServer(bud);
  /**
   * Assets generated by webpack compiler.run or webpack compiler.watch
   */

  React.useEffect(() => {
    var _build$stats, _build$stats2, _build$stats3, _build$stats4, _build$stats5;

    (build === null || build === void 0 ? void 0 : (_build$stats = build.stats) === null || _build$stats === void 0 ? void 0 : _build$stats.assets) && setAssets(build.stats.assets);
    (build === null || build === void 0 ? void 0 : (_build$stats2 = build.stats) === null || _build$stats2 === void 0 ? void 0 : _build$stats2.warnings) && setWarnings(build.stats.warnings);
    (build === null || build === void 0 ? void 0 : (_build$stats3 = build.stats) === null || _build$stats3 === void 0 ? void 0 : _build$stats3.errors) && setErrors(build.stats.errors);
    (build === null || build === void 0 ? void 0 : (_build$stats4 = build.stats) === null || _build$stats4 === void 0 ? void 0 : _build$stats4.hash) && setHash(build.stats.hash);
    (build === null || build === void 0 ? void 0 : (_build$stats5 = build.stats) === null || _build$stats5 === void 0 ? void 0 : _build$stats5.time) && setTime(build.stats.time);
  }, [build]);
  /**
   * Assets generated by WDS middleware (hot builds)
   */

  React.useEffect(() => {
    (devStats === null || devStats === void 0 ? void 0 : devStats.assets) && setAssets(devStats.assets);
    (devStats === null || devStats === void 0 ? void 0 : devStats.warnings) && setWarnings(devStats.warnings);
    (devStats === null || devStats === void 0 ? void 0 : devStats.errors) && setErrors(devStats.errors);
    (devStats === null || devStats === void 0 ? void 0 : devStats.hash) && setHash(devStats.hash);
    (devStats === null || devStats === void 0 ? void 0 : devStats.time) && setTime(devStats.time);
  }, [devStats]);
  /**
   * For convenience set a boolean conditional state variable
   * for tracked build stats. This affords not having to
   * litter length > 0 checks throughout the rest of the application.
   */

  const [hasAssets, setHasAssets] = React.useState(false);
  React.useEffect(() => {
    if (assets && assets.length > 0) {
      setHasAssets(true);
      bud.logger.info({
        name: 'bud.compiler',
        assets: assets.map(asset => asset.name)
      }, 'new state: assets');
    }
  }, [assets]);
  const [hasWarnings, setHasWarnings] = React.useState(false);
  React.useEffect(() => {
    if (warnings && warnings.length > 0) {
      setHasWarnings(true);
      bud.logger.info({
        name: 'bud.compiler',
        warnings: warnings.map(asset => asset.name)
      }, 'new state: warnings');
    }
  }, [warnings]);
  const [hasErrors, setHasErrors] = React.useState(false);
  React.useEffect(() => {
    if (errors && errors.length > 0) {
      setHasErrors(true);
      bud.logger.info({
        name: 'bud.compiler',
        errors: errors.map(asset => asset.name)
      }, 'new state: errors');
    }
  }, [errors]);
  const [hasHash, setHasHash] = React.useState(false);
  React.useEffect(() => {
    if (hash) {
      setHasHash(true);
      bud.logger.info({
        name: 'bud.compiler',
        hash
      }, 'new state: hash');
    }
  }, [hash]);
  const [hasTime, setHasTime] = React.useState(false);
  React.useEffect(() => {
    if (time) {
      setHasTime(true);
      bud.logger.info({
        name: 'bud.compiler',
        payload: time
      }, 'new state: time');
    }
  }, [time]);
  /**
   * Build needs to have assets/errors present
   * before returning true for build.done even if the percentage is 100%.
   * This is because progress finishes slightly before the assets
   * finish processing into state and so only checking for % it is common
   * to end up with no asset logs rendered to the CLI before the application
   * exits.
   */

  const done = percentage === 1 && (hasAssets || hasErrors);
  const success = percentage === 1 && hasAssets && !hasErrors;
  /**
   * Return state to consumers.
   */

  return {
    assets,
    hasAssets,
    errors,
    hasErrors,
    hash,
    hasHash,
    time,
    hasTime,
    warnings,
    hasWarnings,
    percentage,
    done,
    success,
    message,
    hotSyncServer
  };
};

/**
 * Forked from {@link https://github.com/andregardi/use-global-hook}
 */
function setState(store, newState, afterUpdateCallback) {
  store.state = _objectSpread2(_objectSpread2({}, store.state), newState);
  store.listeners.forEach(listener => {
    listener.run(store.state);
  });
  afterUpdateCallback && afterUpdateCallback();
}

function useCustom(store, React, mapState, mapActions) {
  const [, originalHook] = React.useState(Object.create(null));
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(() => mapActions ? mapActions(store.actions) : store.actions, [mapActions, store.actions]);
  React.useEffect(() => {
    const newListener = {
      oldState: {}
    };
    newListener.run = mapState ? newState => {
      const mappedState = mapState(newState);

      if (mappedState !== newListener.oldState) {
        newListener.oldState = mappedState;
        originalHook(mappedState);
      }
    } : originalHook;
    store.listeners.push(newListener);
    newListener.run(store.state);
    return () => {
      store.listeners = store.listeners.filter(listener => listener !== newListener);
    };
  }, []); // eslint-disable-line

  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }

    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = {
    state: initialState,
    listeners: []
  };
  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(null, store, React);
};

const useFocusState = useStore(React__default, {
  assets: true,
  debug: false,
  devServer: false,
  errors: false,
  warnings: false
}, {
  setFocus: (store, value) => {
    store.setState(_objectSpread2(_objectSpread2({}, store.state), value));
  }
});

/**
 * List item indicator
 * @prop {boolean} active
 */

const Bullet = ({
  active
}) => /*#__PURE__*/React__default.createElement(ink.Text, null, active ? '◉' : ' ');

Bullet.propTypes = {
  active: PropTypes.bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} bud
 */

const Nav = ({
  build,
  focused,
  bud
}) => {
  var _build$errors, _build$errors2, _build$warnings, _build$warnings2;

  return /*#__PURE__*/React__default.createElement(ink.Box, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1
  }, /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: '#545DD7'
  }, "@roots/bud")), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.assets
  }), " Assets")), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 ? '#dc3545' : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.errors) || false
  }), " Errors", (build === null || build === void 0 ? void 0 : (_build$errors2 = build.errors) === null || _build$errors2 === void 0 ? void 0 : _build$errors2.length) > 0 && build.errors[0] ? ` [${build.errors.length}]` : `  `)), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 ? '#fd7e14' : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.warnings) || false
  }), " Warnings", (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.length) > 0 ? ` [${build === null || build === void 0 ? void 0 : build.warnings.length}]` : `  `)), bud.features.enabled('hot') && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.devServer) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.devServer
  }), " Dev server"))), bud.features.enabled('browserSync') && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.browserSync
  }), " BrowserSync"))), bud.features.enabled('debug') && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598'
  }, /*#__PURE__*/React__default.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.debug) || false
  }), " Debug"))));
};

Nav.propTypes = {
  build: PropTypes.object,
  focused: PropTypes.object,
  bud: PropTypes.object
};

const BLACKLIST_PROPS = ['percent', 'left', 'right', 'columns', 'character', 'rightPad'];

class Bar extends React__default.Component {
  getString() {
    const {
      percent,
      columns,
      left,
      right,
      character,
      rightPad
    } = this.props;
    const screen = columns || process.stdout.columns || 80;
    const space = screen - right - left;
    const max = Math.min(Math.floor(space * percent), space);
    const chars = character.repeat(max);

    if (!rightPad) {
      return chars;
    }

    return chars + ' '.repeat(space - max);
  }

  render() {
    const props = blacklist(this.props, BLACKLIST_PROPS);
    return /*#__PURE__*/React__default.createElement(ink.Text, props, this.getString());
  }

}

Bar.defaultProps = {
  columns: 0,
  percent: 1,
  left: 0,
  right: 0,
  character: '█',
  rightPad: false
};
Bar.propTypes = {
  columns: PropTypes.number,
  percent: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  character: PropTypes.string,
  rightPad: PropTypes.bool
};

/**
 * Loading (Progress Plugin)
 */

const Loading = ({
  build,
  width
}) => {
  var _build$percentage;

  return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? /*#__PURE__*/React__default.createElement(ink.Box, {
    maxWidth: width,
    textWrap: "truncate",
    flexDirection: "row"
  }, /*#__PURE__*/React__default.createElement(ink.Text, {
    bgcolor: '#171c56'
  }, /*#__PURE__*/React__default.createElement(ink.Text, {
    width: 6
  }, Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100), "%", (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' ')), /*#__PURE__*/React__default.createElement(ink.Text, {
    color: '#545DD7'
  }, /*#__PURE__*/React__default.createElement(Bar, {
    character: "\u2588",
    percent: (_build$percentage = build === null || build === void 0 ? void 0 : build.percentage) !== null && _build$percentage !== void 0 ? _build$percentage : 0.01
  }))) : [];
};

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number
};

/** Modules */
/**
 * Build Info
 */

const BuildInfo = ({
  build,
  width
}) => /*#__PURE__*/React__default.createElement(ink.Box, {
  flexDirection: "column",
  paddingTop: 1
}, (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && /*#__PURE__*/React__default.createElement(ink.Text, {
  color: "#6C758F",
  marginTop: 1
}, "Build ", build === null || build === void 0 ? void 0 : build.hash, ". Finished in ", (build === null || build === void 0 ? void 0 : build.time) / 1000, "s."), /*#__PURE__*/React__default.createElement(Loading, {
  build: build,
  width: width
}));

BuildInfo.propTypes = {
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number
};

/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */

const App = ({
  children,
  state,
  build,
  bud,
  width,
  height
}) => {
  const [focused, setFocused] = React.useState({});
  React.useEffect(() => {
    setFocused(state);
  }, [state]);
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    width: width,
    maxWidth: width,
    minHeight: height,
    textWrap: "truncate",
    paddingRight: 1,
    paddingBottom: 1,
    paddingTop: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React__default.createElement(Nav, {
    build: build,
    focused: focused || {},
    bud: bud
  }), children, /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(BuildInfo, {
    build: build,
    width: width
  }));
};

App.propTypes = {
  children: PropTypes.array,
  state: PropTypes.object,
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */

const Indicator = ({
  emitted
}) => /*#__PURE__*/React__default.createElement(ink.Text, {
  color: emitted ? '#545DD7' : '#6C758F'
}, "\u29BF ");

Indicator.propTypes = {
  emitted: PropTypes.bool
};
/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */

const Asset = ({
  asset
}) => {
  const display = asset.name.split('.').pop() == 'css' || asset.name.split('.').pop() == 'js';
  return !display ? [] : /*#__PURE__*/React__default.createElement(ink.Box, {
    flexDirection: "row",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(Indicator, {
    emitted: asset.emitted
  }), /*#__PURE__*/React__default.createElement(ink.Text, {
    color: asset.emitted ? 'white' : 'gray'
  }, asset.name)), /*#__PURE__*/React__default.createElement(ink.Spacer, null), /*#__PURE__*/React__default.createElement(ink.Box, null, /*#__PURE__*/React__default.createElement(ink.Text, {
    dimColor: "white"
  }, asset.size / 1000, "kb")));
};

Asset.propTypes = {
  asset: PropTypes.object
};
/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */

const Assets = ({
  build,
  actions
}) => {
  var _build$assets, _build$assets2;

  const {
    isFocused
  } = ink.useFocus({
    autoFocus: true
  });
  React.useEffect(() => {
    actions.setFocus({
      assets: isFocused
    });
  }, [isFocused]);
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, build === null || build === void 0 ? void 0 : (_build$assets = build.assets) === null || _build$assets === void 0 ? void 0 : _build$assets.map((asset, id) => /*#__PURE__*/React__default.createElement(Asset, {
    key: id,
    asset: asset
  })), (build === null || build === void 0 ? void 0 : (_build$assets2 = build.assets) === null || _build$assets2 === void 0 ? void 0 : _build$assets2.length) == 0 && /*#__PURE__*/React__default.createElement(ink.Text, null, "Loading"));
};

Assets.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
  width: PropTypes.number
};

/**
 * BrowserSync info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */

const BrowserSync = ({
  actions
}) => {
  const {
    isFocused
  } = ink.useFocus({
    autoFocus: false
  });
  React.useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      browserSync: isFocused
    });
  }, [isFocused]);
  /**
   * Capture BrowserSync console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the BrowserSync watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */

  const [lastConsole, setLastConsole] = React.useState(null);
  const [consoleOut, setConsoleOut] = React.useState('');
  patchConsole((stream, data) => {
    setLastConsole(data);
    const frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
    setConsoleOut(frameOut);
  });
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, /*#__PURE__*/React__default.createElement(ink.Text, null, consoleOut));
};

BrowserSync.propTypes = {
  actions: PropTypes.object
};

/**
 * Error
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */

const Error$1 = ({
  message
}) => {
  React.useEffect(() => {
    message && notifier.notify({
      title: 'Build error',
      message
    });
  }, [message]);
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React__default.createElement(ink.Text, {
    wrap: "wrap"
  }, message || ''));
};

Error$1.propTypes = {
  message: PropTypes.string
};

/**
 * Error
 */

const Errors = ({
  build,
  actions
}) => {
  var _build$warnings;

  const {
    isFocused
  } = ink.useFocus({
    autoFocus: true
  });
  React.useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      errors: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = React.useState(null);
  React.useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : build.errors) && build.errors.length > 0 && build.errors.map((err, i) => /*#__PURE__*/React__default.createElement(Error$1, {
    message: err,
    key: i
  })), (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) == 0 && /*#__PURE__*/React__default.createElement(ink.Text, null, "Nothing to see here."));
};

Errors.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113,
    z = n ? Symbol.for("react.memo") : 60115,
    A = n ? Symbol.for("react.lazy") : 60116,
    B = "function" === typeof Symbol && Symbol.iterator;

function C(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var D = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
},
    E = {};

function F(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

F.prototype.isReactComponent = {};

F.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(C(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function G() {}

G.prototype = F.prototype;

function H(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

var I = H.prototype = new G();
I.constructor = H;
objectAssign(I, F.prototype);
I.isPureReactComponent = !0;
var J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, c) {
  var e,
      d = {},
      g = null,
      k = null;
  if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
  var f = arguments.length - 2;
  if (1 === f) d.children = c;else if (1 < f) {
    for (var h = Array(f), m = 0; m < f; m++) h[m] = arguments[m + 2];

    d.children = h;
  }
  if (a && a.defaultProps) for (e in f = a.defaultProps, f) void 0 === d[e] && (d[e] = f[e]);
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: J.current
  };
}

function N(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function O(a) {
  return "object" === typeof a && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var P = /\/+/g,
    Q = [];

function R(a, b, c, e) {
  if (Q.length) {
    var d = Q.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = c;
    d.context = e;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: c,
    context: e,
    count: 0
  };
}

function S(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > Q.length && Q.push(a);
}

function T(a, b, c, e) {
  var d = typeof a;
  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + U(d, k);
    g += T(d, f, c, e);
  } else if (null === a || "object" !== typeof a ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, k++), g += T(d, f, c, e);else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}

function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}

function U(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function W(a, b) {
  a.func.call(a.context, b, a.count++);
}

function aa(a, b, c) {
  var e = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? X(a, e, c, function (a) {
    return a;
  }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
}

function X(a, b, c, e, d) {
  var g = "";
  null != c && (g = ("" + c).replace(P, "$&/") + "/");
  b = R(b, g, e, d);
  V(a, aa, b);
  S(b);
}

var Y = {
  current: null
};

function Z() {
  var a = Y.current;
  if (null === a) throw Error(C(321));
  return a;
}

var ba = {
  ReactCurrentDispatcher: Y,
  ReactCurrentBatchConfig: {
    suspense: null
  },
  ReactCurrentOwner: J,
  IsSomeRendererActing: {
    current: !1
  },
  assign: objectAssign
};
var Children = {
  map: function (a, b, c) {
    if (null == a) return a;
    var e = [];
    X(a, e, null, b, c);
    return e;
  },
  forEach: function (a, b, c) {
    if (null == a) return a;
    b = R(null, null, b, c);
    V(a, W, b);
    S(b);
  },
  count: function (a) {
    return V(a, function () {
      return null;
    }, null);
  },
  toArray: function (a) {
    var b = [];
    X(a, b, null, function (a) {
      return a;
    });
    return b;
  },
  only: function (a) {
    if (!O(a)) throw Error(C(143));
    return a;
  }
};
var Component = F;
var Fragment = r;
var Profiler = u;
var PureComponent = H;
var StrictMode = t;
var Suspense = y;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;

var cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(C(267, a));
  var e = objectAssign({}, a.props),
      d = a.key,
      g = a.ref,
      k = a._owner;

  if (null != b) {
    void 0 !== b.ref && (g = b.ref, k = J.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

    for (h in b) K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
  }

  var h = arguments.length - 2;
  if (1 === h) e.children = c;else if (1 < h) {
    f = Array(h);

    for (var m = 0; m < h; m++) f[m] = arguments[m + 2];

    e.children = f;
  }
  return {
    $$typeof: p,
    type: a.type,
    key: d,
    ref: g,
    props: e,
    _owner: k
  };
};

var createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: w,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: v,
    _context: a
  };
  return a.Consumer = a;
};

var createElement = M;

var createFactory = function (a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};

var createRef = function () {
  return {
    current: null
  };
};

var forwardRef = function (a) {
  return {
    $$typeof: x,
    render: a
  };
};

var isValidElement = O;

var lazy = function (a) {
  return {
    $$typeof: A,
    _ctor: a,
    _status: -1,
    _result: null
  };
};

var memo = function (a, b) {
  return {
    $$typeof: z,
    type: a,
    compare: void 0 === b ? null : b
  };
};

var useCallback = function (a, b) {
  return Z().useCallback(a, b);
};

var useContext = function (a, b) {
  return Z().useContext(a, b);
};

var useDebugValue = function () {};

var useEffect = function (a, b) {
  return Z().useEffect(a, b);
};

var useImperativeHandle = function (a, b, c) {
  return Z().useImperativeHandle(a, b, c);
};

var useLayoutEffect = function (a, b) {
  return Z().useLayoutEffect(a, b);
};

var useMemo = function (a, b) {
  return Z().useMemo(a, b);
};

var useReducer = function (a, b, c) {
  return Z().useReducer(a, b, c);
};

var useRef = function (a) {
  return Z().useRef(a);
};

var useState = function (a) {
  return Z().useState(a);
};

var version = "16.13.1";

var react_production_min = {
	Children: Children,
	Component: Component,
	Fragment: Fragment,
	Profiler: Profiler,
	PureComponent: PureComponent,
	StrictMode: StrictMode,
	Suspense: Suspense,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
	cloneElement: cloneElement,
	createContext: createContext,
	createElement: createElement,
	createFactory: createFactory,
	createRef: createRef,
	forwardRef: forwardRef,
	isValidElement: isValidElement,
	lazy: lazy,
	memo: memo,
	useCallback: useCallback,
	useContext: useContext,
	useDebugValue: useDebugValue,
	useEffect: useEffect,
	useImperativeHandle: useImperativeHandle,
	useLayoutEffect: useLayoutEffect,
	useMemo: useMemo,
	useReducer: useReducer,
	useRef: useRef,
	useState: useState,
	version: version
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var react_development = createCommonjsModule(function (module, exports) {

if (process.env.NODE_ENV !== "production") {
  (function () {

    var _assign = objectAssign;

    var checkPropTypes = checkPropTypes_1;

    var ReactVersion = '16.13.1'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary

    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * Keeps track of the current dispatcher.
     */


    var ReactCurrentDispatcher = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    /**
     * Keeps track of the current batch's configuration such as how long an update
     * should suspend for if it needs to.
     */

    var ReactCurrentBatchConfig = {
      suspense: null
    };
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */

    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

    function describeComponentFrame(name, source, ownerName) {
      var sourceInfo = '';

      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, '');
        {
          // In DEV, include code for a common special case:
          // prefer "folder/index.js" instead of just "index.js".
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);

            if (match) {
              var pathBeforeSlash = match[1];

              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                fileName = folderName + '/' + fileName;
              }
            }
          }
        }
        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
      } else if (ownerName) {
        sourceInfo = ' (created by ' + ownerName + ')';
      }

      return '\n    in ' + (name || 'Unknown') + sourceInfo;
    }

    var Resolved = 1;

    function refineResolvedLazyComponent(lazyComponent) {
      return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return "Profiler";

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_SUSPENSE_TYPE:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return 'Context.Consumer';

          case REACT_PROVIDER_TYPE:
            return 'Context.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_BLOCK_TYPE:
            return getComponentName(type.render);

          case REACT_LAZY_TYPE:
            {
              var thenable = type;
              var resolvedThenable = refineResolvedLazyComponent(thenable);

              if (resolvedThenable) {
                return getComponentName(resolvedThenable);
              }

              break;
            }
        }
      }

      return null;
    }

    var ReactDebugCurrentFrame = {};
    var currentlyValidatingElement = null;

    function setCurrentlyValidatingElement(element) {
      {
        currentlyValidatingElement = element;
      }
    }

    {
      // Stack implementation injected by the current renderer.
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentlyValidatingElement) {
          var name = getComponentName(currentlyValidatingElement.type);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    /**
     * Used by act() to track whether you're inside an act() scope.
     */

    var IsSomeRendererActing = {
      current: false
    };
    var ReactSharedInternals = {
      ReactCurrentDispatcher: ReactCurrentDispatcher,
      ReactCurrentBatchConfig: ReactCurrentBatchConfig,
      ReactCurrentOwner: ReactCurrentOwner,
      IsSomeRendererActing: IsSomeRendererActing,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      _assign(ReactSharedInternals, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    } // by calls to these methods by a Babel plugin.
    //
    // In PROD (or in packages without access to React internals),
    // they are left as they are instead.

    function warn(format) {
      {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        printWarning('warn', format, args);
      }
    }

    function error(format) {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

        if (!hasExistingStack) {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();

          if (stack !== '') {
            format += '%s';
            args = args.concat([stack]);
          }
        }

        var argsWithFormat = args.map(function (item) {
          return '' + item;
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });
          throw new Error(message);
        } catch (x) {}
      }
    }

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + "." + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
        {
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        }
      }

      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function () {
        {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function () {
        {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    function warnIfStringRefCannotBeAutoConverted(config) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
          {
            warnIfStringRefCannotBeAutoConverted(config);
          }
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      if (!!(element === null || element === undefined)) {
        {
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        }
      }

      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              if (!didWarnAboutMaps) {
                warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
              }

              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          {
            {
              throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
            }
          }
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      return traverseAllChildren(children, function () {
        return null;
      }, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
        return child;
      });
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      if (!isValidElement(children)) {
        {
          throw Error("React.Children.only expected to receive a single React element child.");
        }
      }

      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
            error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
          }
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      var hasWarnedAboutUsingNestedContextConsumers = false;
      var hasWarnedAboutUsingConsumerProvider = false;
      {
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
          $$typeof: REACT_CONTEXT_TYPE,
          _context: context,
          _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

        Object.defineProperties(Consumer, {
          Provider: {
            get: function () {
              if (!hasWarnedAboutUsingConsumerProvider) {
                hasWarnedAboutUsingConsumerProvider = true;
                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
              }

              return context.Provider;
            },
            set: function (_Provider) {
              context.Provider = _Provider;
            }
          },
          _currentValue: {
            get: function () {
              return context._currentValue;
            },
            set: function (_currentValue) {
              context._currentValue = _currentValue;
            }
          },
          _currentValue2: {
            get: function () {
              return context._currentValue2;
            },
            set: function (_currentValue2) {
              context._currentValue2 = _currentValue2;
            }
          },
          _threadCount: {
            get: function () {
              return context._threadCount;
            },
            set: function (_threadCount) {
              context._threadCount = _threadCount;
            }
          },
          Consumer: {
            get: function () {
              if (!hasWarnedAboutUsingNestedContextConsumers) {
                hasWarnedAboutUsingNestedContextConsumers = true;
                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
              }

              return context.Consumer;
            }
          }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

        context.Consumer = Consumer;
      }
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    function lazy(ctor) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _ctor: ctor,
        // React uses these fields to store the result.
        _status: -1,
        _result: null
      };
      {
        // In production, this would just set it on the object.
        var defaultProps;
        var propTypes;
        Object.defineProperties(lazyType, {
          defaultProps: {
            configurable: true,
            get: function () {
              return defaultProps;
            },
            set: function (newDefaultProps) {
              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              defaultProps = newDefaultProps; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'defaultProps', {
                enumerable: true
              });
            }
          },
          propTypes: {
            configurable: true,
            get: function () {
              return propTypes;
            },
            set: function (newPropTypes) {
              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              propTypes = newPropTypes; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'propTypes', {
                enumerable: true
              });
            }
          }
        });
      }
      return lazyType;
    }

    function forwardRef(render) {
      {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
        } else if (typeof render !== 'function') {
          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          if (render.length !== 0 && render.length !== 2) {
            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
          }
        }

        if (render != null) {
          if (render.defaultProps != null || render.propTypes != null) {
            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
          }
        }
      }
      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
        }
      }
      return {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: compare === undefined ? null : compare
      };
    }

    function resolveDispatcher() {
      var dispatcher = ReactCurrentDispatcher.current;

      if (!(dispatcher !== null)) {
        {
          throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
        }
      }

      return dispatcher;
    }

    function useContext(Context, unstable_observedBits) {
      var dispatcher = resolveDispatcher();
      {
        if (unstable_observedBits !== undefined) {
          error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
        } // TODO: add a more generic warning for invalid values.


        if (Context._context !== undefined) {
          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
          // and nobody should be using this in existing code.

          if (realContext.Consumer === Context) {
            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
          } else if (realContext.Provider === Context) {
            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
          }
        }
      }
      return dispatcher.useContext(Context, unstable_observedBits);
    }

    function useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

    function useReducer(reducer, initialArg, init) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useReducer(reducer, initialArg, init);
    }

    function useRef(initialValue) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useRef(initialValue);
    }

    function useEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useEffect(create, deps);
    }

    function useLayoutEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useLayoutEffect(create, deps);
    }

    function useCallback(callback, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useCallback(callback, deps);
    }

    function useMemo(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useMemo(create, deps);
    }

    function useImperativeHandle(ref, create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useImperativeHandle(ref, create, deps);
    }

    function useDebugValue(value, formatterFn) {
      {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(source) {
      if (source !== undefined) {
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }

    function getSourceInfoErrorAddendumForProps(elementProps) {
      if (elementProps !== null && elementProps !== undefined) {
        return getSourceInfoErrorAddendum(elementProps.__source);
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
      }

      setCurrentlyValidatingElement(element);
      {
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
      }
      setCurrentlyValidatingElement(null);
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var name = getComponentName(type);
        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          setCurrentlyValidatingElement(element);
          checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
          setCurrentlyValidatingElement(null);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true;
          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        setCurrentlyValidatingElement(fragment);
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            break;
          }
        }

        if (fragment.ref !== null) {
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
        }

        setCurrentlyValidatingElement(null);
      }
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendumForProps(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        {
          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    var didWarnAboutDeprecatedCreateFactory = false;

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      {
        if (!didWarnAboutDeprecatedCreateFactory) {
          didWarnAboutDeprecatedCreateFactory = true;
          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
        } // Legacy hook: remove it


        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    {
      try {
        var frozenObject = Object.freeze({});
        var testMap = new Map([[frozenObject, null]]);
        var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
        // https://github.com/rollup/rollup/issues/1771
        // TODO: we can remove these if Rollup fixes the bug.

        testMap.set(0, 0);
        testSet.add(0);
      } catch (e) {}
    }
    var createElement$1 = createElementWithValidation;
    var cloneElement$1 = cloneElementWithValidation;
    var createFactory = createFactoryWithValidation;
    var Children = {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    };
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
    exports.cloneElement = cloneElement$1;
    exports.createContext = createContext;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createRef = createRef;
    exports.forwardRef = forwardRef;
    exports.isValidElement = isValidElement;
    exports.lazy = lazy;
    exports.memo = memo;
    exports.useCallback = useCallback;
    exports.useContext = useContext;
    exports.useDebugValue = useDebugValue;
    exports.useEffect = useEffect;
    exports.useImperativeHandle = useImperativeHandle;
    exports.useLayoutEffect = useLayoutEffect;
    exports.useMemo = useMemo;
    exports.useReducer = useReducer;
    exports.useRef = useRef;
    exports.useState = useState;
    exports.version = ReactVersion;
  })();
}
});

var react = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = react_production_min;
} else {
  module.exports = react_development;
}
});

/**
 * Warning (single)
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */

const Warning = ({
  message
}) => {
  React.useEffect(() => {
    message && notifier.notify({
      title: 'Warning',
      message
    });
  }, [message]);
  return !message ? [] : /*#__PURE__*/React__default.createElement(ink.Box, {
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React__default.createElement(ink.Text, {
    wrap: "wrap"
  }, message));
};

Warning.propTypes = {
  message: PropTypes.string
};

/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */

const Warnings = ({
  build,
  actions
}) => {
  var _build$warnings, _build$warnings2, _build$warnings3;

  const {
    isFocused
  } = ink.useFocus({
    autoFocus: false
  });
  React.useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      warnings: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = React.useState(null);
  React.useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.warnings]);
  return /*#__PURE__*/react.createElement(ink.Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 && (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.map((warning, i) => /*#__PURE__*/react.createElement(Warning, {
    message: warning,
    key: i
  }))), (build === null || build === void 0 ? void 0 : (_build$warnings3 = build.warnings) === null || _build$warnings3 === void 0 ? void 0 : _build$warnings3.length) == 0 && /*#__PURE__*/react.createElement(ink.Text, null, "Nothing to see here."));
};

Warnings.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};

/**
 * DevServer info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */

const DevServer = ({
  build,
  actions
}) => {
  const {
    isFocused
  } = ink.useFocus({
    autoFocus: false
  });
  React.useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      devServer: isFocused
    });
  }, [isFocused]);
  /**
   * Capture DevServer console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the DevServer watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */

  const [lastConsole, setLastConsole] = React.useState(null);
  const [consoleOut, setConsoleOut] = React.useState('');
  patchConsole((stream, data) => {
    setLastConsole(data);
    const frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
    setConsoleOut(frameOut);
  });
  return /*#__PURE__*/React__default.createElement(ink.Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, /*#__PURE__*/React__default.createElement(ink.Text, null, build === null || build === void 0 ? void 0 : build.devServer));
};

DevServer.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
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
  } = ink.useApp();
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

  ink.useInput(input => {
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

  React.useEffect(() => {
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
  React.useEffect(() => {
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
  return /*#__PURE__*/React__default.createElement(App, {
    width: width,
    height: height,
    build: build,
    state: state,
    bud: bud
  }, /*#__PURE__*/React__default.createElement(Assets, {
    width: width,
    actions: actions,
    build: build
  }), /*#__PURE__*/React__default.createElement(Errors, {
    actions: actions,
    build: build
  }), /*#__PURE__*/React__default.createElement(Warnings, {
    actions: actions,
    build: build
  }), showBrowserSync && /*#__PURE__*/React__default.createElement(BrowserSync, {
    actions: actions
  }), /*#__PURE__*/React__default.createElement(DevServer, {
    actions: actions,
    build: build
  }));
};

Runner.propTypes = {
  compiler: PropTypes.object,
  bud: PropTypes.object
};

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
            value: webpackConfig.entry[entry],
        }, "injecting hot middleware");
    });
    return webpackConfig;
};
var renderCompilerDashboard = function (bud, webpackConfig) {
    bud.compiler = bud.features.enabled('hot')
        ? webpack__default(injectHot({
            webpackConfig: webpackConfig,
            overlay: bud.options.has('devServer.overlay') &&
                bud.options.get('devServer.overlay')
                ? true
                : true,
            reload: bud.options.has('devServer.reload') &&
                bud.options.get('devServer.reload')
                ? true
                : true,
            logger: bud.logger,
        }))
        : webpack__default(webpackConfig);
    bud.logger.info({
        name: 'bud.compiler',
    }, "compiler attached to bud");
    var props = { bud: bud };
    var application = React__default.createElement(Runner, props);
    /** 🚀 */
    ink.render(application);
};

var compiler = function (bud) { return ({
    bud: bud,
    dashboardEnabled: function () {
        return this.bud.features.enabled('dashboard');
    },
    buildConfig: function () {
        this.config = build(this.bud);
        return this;
    },
    compile: function () {
        renderCompilerDashboard(this.bud, this.config);
    },
}); };

/**
 * Plugin controller.
 *
 * @this {Bud}
 */
var controller = function (bud) { return ({
    bud: bud,
    /**
     * Build plugin.
     */
    build: function (extension) {
        this.plugin = extension(this.bud);
        this.bindPluginProps();
        this.setPluginOptions();
        this.mergePluginOptions();
        return this.makePlugin();
    },
    /**
     * Bind plugin props
     */
    bindPluginProps: function () {
        this.ensurePluginProp('bud', this.bud);
        this.ensurePluginProp('options', this.bud.util.fab.undefined());
        this.ensurePluginProp('setOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('mergeOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('when', this.bud.util.fab["true"]);
    },
    /**
     * Ensure plugin prop is set.
     */
    ensurePluginProp: function (prop, fallback) {
        this.plugin[prop] = this.plugin[prop] || fallback;
    },
    /**
     * Set plugin options.
     */
    setPluginOptions: function () {
        this.boundValue = this.plugin.setOptions();
        if (this.boundValue) {
            this.plugin.options = this.boundValue;
        }
        delete this.boundValue;
    },
    /**
     * Merge plugin options.
     */
    mergePluginOptions: function () {
        this.boundValue = this.plugin.mergeOptions();
        if (this.boundValue) {
            this.plugin.options = tslib.__assign(tslib.__assign({}, this.plugin.options), this.boundValue);
        }
        delete this.boundValue;
    },
    /**
     * Make plugin.
     */
    makePlugin: function () {
        this.plugin =
            this.plugin.when() && this.plugin.make
                ? this.plugin.make(this.bud)
                : this.bud.util.fab.undefined();
        if (this.plugin) {
            return this.plugin;
        }
    },
}); };

var log$1 = function (repository, data, message) {
    logger.info(tslib.__assign({ name: 'container', repository: repository }, (data || {})), message);
};
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = new container(repository);
};
var add = function (entry) {
    this.repository.push(entry);
};
var get = function (key) {
    return lodash.get(this.repository, key);
};
var is = function (key, value) {
    return this.get(key) == value;
};
var require$1 = function (key) {
    var module = this.get(key);
    require$1(module);
};
var set = function (key, value) {
    logger.info({ name: 'container', key: key, value: value }, this.name + ".set");
    lodash.set(this.repository, key, value);
};
var has$1 = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false;
};
var merge = function (key, value) {
    this.repository[key] = this.repository[key]
        ? tslib.__assign(tslib.__assign({}, this.repository[key]), value) : this.repository[key]
        ? tslib.__spreadArrays(this.repository[key], value) : [this.repository[key], value];
};
var containerMethodDelete = function (key) {
    delete this.repository[key];
};
var exists = function (key) {
    return fsExtra.existsSync(this.repository[key]);
};
var enable = function (key) {
    logger.info({ name: 'container', key: key, value: true }, this.name + ".enable");
    this.repository[key] = true;
};
var disable = function (key) {
    logger.info({ name: 'container', key: key, value: false }, this.name + ".disable");
    this.repository[key] = false;
};
var enabled = function (key) {
    return this.is(key, true);
};
var disabled = function (key) {
    return this.is(key, false);
};
var map$1 = function () {
    var _a;
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return (_a = this.repository).map.apply(_a, params);
};
var entries = function () {
    return this.repository;
};
var container = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    this.name = name;
    this.repository = repository;
    this["new"] = newContainer;
    this.get = get;
    this.has = has$1;
    this.set = set;
    this.map = map$1;
    this.entries = entries;
    this.merge = merge;
    this["delete"] = containerMethodDelete;
    this.is = is;
    this.enable = enable;
    this.enabled = enabled;
    this.disable = disable;
    this.disabled = disabled;
};
/**
 * Bind container.
 */
var bindContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log$1(repository, { repository: name }, "create container");
    return new container(repository, name);
};
/**
 * Bind file container.
 */
var bindFileContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log$1(repository, { repository: name }, "create container");
    var store = new container(repository, name);
    store.require = require$1;
    store.exists = exists;
    return store;
};
/**
 * Bind extension container.
 */
var bindExtensionContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log$1(repository, { repository: name }, "create extension api container");
    var store = new container(repository, name);
    store.controller = controller;
    store.add = add;
    return store;
};

/**
 * Bud framework.
 *
 * @constructor
 */
var bootstrap = function () {
    var _this = this;
    /**
     * The framework container object.
     */
    this.framework = {};
    /**
     * Logger (pino)
     */
    this.logger = logger;
    /**
     * Containers
     */
    this.repositories = repositories;
    this.store = bindContainer;
    this.fileStore = bindFileContainer;
    this.extensionStore = bindExtensionContainer;
    /**
     * Utilities and dependencies.
     */
    this.framework.logger = this.logger;
    this.framework.util = util;
    this.framework.fs = util.fs;
    /**
     * Paths container.
     */
    this.framework.paths = this.store(this.repositories.paths, 'bud.paths');
    /**
     * Project configuration files container.
     */
    this.framework.configs = this.fileStore(this.repositories.configs(this.framework.paths), 'bud.configs');
    /**
     * Envvar container.
     */
    this.framework.env = this.store(this.repositories.env(this.framework.paths), 'bud.env');
    /**
     * CLI containers.
     */
    this.framework.args = this.store(this.repositories.cli.args(this.framework.env), 'bud.args');
    this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags');
    /**
     * Features container.
     */
    this.framework.features = this.store(this.repositories.features, 'bud.features');
    /**
     * Options container.
     */
    this.framework.options = this.store(this.repositories.options, 'bud.options');
    /**
     * Presets container.
     */
    this.framework.presets = this.store(this.repositories.presets, 'bud.presets');
    /**
     * Framework plugins container.
     */
    this.framework.plugins = this.extensionStore(this.repositories.plugins, 'bud.plugins');
    /**
     * Webpack module containers.
     */
    this.framework.patterns = this.store(this.repositories.patterns, 'bud.patterns');
    this.framework.loaders = this.store(this.repositories.loaders, 'bud.loaders');
    this.framework.rules = this.store(this.repositories.rules, 'bud.rules');
    this.framework.uses = this.store(this.repositories.uses, 'bud.uses');
    /**
     * Webpack plugins.
     */
    this.framework.adapters = this.extensionStore(this.repositories.adapters, 'bud.adapters');
    /**
     * Hooks API and store.
     */
    this.framework.hooks = hooks(this.logger).init(this.framework);
    /**
     * Compiler.
     */
    this.framework.compiler = compiler(this.framework);
    /**
     * Set mode.
     */
    this.framework.mode = this.framework.args.get('mode');
    this.framework.inProduction = this.framework.args.is('mode', 'production');
    this.framework.inDevelopment = this.framework.args.is('mode', 'development');
    /**
     * Node process handling.
     */
    this.framework.process = util.processHandler(this.framework);
    /**
     * API methods.
     */
    Object.values(api).forEach(function (method) {
        _this.framework[method.name] = method;
        _this.logger.info({ name: 'bootstrap' }, "bootstrapped api method: bud." + method.name);
    });
    /**
     * Enable features based on presence of configuration files.
     */
    this.framework.features.set('babel', this.framework.configs.has('babel'));
    this.framework.features.set('postCss', this.framework.configs.has('postCss'));
    /**
     * Set options based based on presence of configuration files.
     */
    this.framework.options.set('babel', babel$1(this.framework.configs));
    this.framework.options.set('postCss', postCss$1(this.framework.configs));
    this.framework.options.set('browserSync', browserSync(this.framework.flags));
};
var budInstance = new bootstrap().framework;
/**
 * Bud Framework
 */
var bud = budInstance;

exports.bootstrap = bootstrap;
exports.bud = bud;
