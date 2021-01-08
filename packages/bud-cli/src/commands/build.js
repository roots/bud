"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.aliases = void 0;
const path_1 = require("path");
const __1 = require("../");
const cwd = process.cwd();
exports.aliases = 'build';
exports.describe = 'Compile source assets.';
const builder = ({ option, }) => option('config', {
    describe: 'Specify a custom configuration file',
    default: 'bud.config.js',
})
    .option('env', {
    describe: 'Build mode',
    choices: ['development', 'production', 'none'],
    default: 'none',
})
    .option('minify', {
    describe: 'Minify assets',
    type: 'boolean',
    default: false,
})
    .option('gzip', {
    describe: 'Gzip static assets',
    type: 'boolean',
    default: false,
})
    .option('hash', {
    describe: 'Hash asset filenames',
    type: 'boolean',
    default: false,
})
    .option('brotli', {
    describe: 'Apply brotli compression to static assets',
    type: 'boolean',
    default: false,
})
    .option('runtime', {
    describe: 'Generate runtime chunk',
    type: 'boolean',
    default: false,
})
    .option('vendor', {
    describe: 'Generate vendor chunk',
    type: 'boolean',
    default: false,
})
    .option('src', {
    describe: 'Override src directory',
    type: 'string',
})
    .option('dist', {
    describe: 'Override dist directory',
    type: 'string',
})
    .option('port', {
    describe: 'Dev port',
    type: 'number',
    default: 3000,
})
    .option('host', {
    describe: 'Dev host',
    type: 'string',
    default: 'localhost',
})
    .option('proxy', {
    describe: 'Hostname to proxy',
    type: 'string',
})
    .option('html', {
    describe: 'Use an HTML5 boilerplate',
    type: 'boolean',
})
    .option('log', {
    describe: 'Specify filepath to log to',
    type: 'string',
})
    .example('Dev', 'bud build --env development')
    .example('Build', 'bud build --env production --runtime --vendor --minify --gzip')
    .hide('help')
    .hide('version')
    .showHelpOnFail(true);
exports.builder = builder;
/**
 * handler: bud build
 */
const handler = (args) => {
    var _a;
    const cfg = (_a = args.config) !== null && _a !== void 0 ? _a : 'bud.config.js';
    const cfgPath = path_1.join(cwd, cfg);
    try {
        require(cfgPath);
    }
    catch (error) {
        __1.Error(`To generate a new config file try \`bud publish bud.config.js\`\nIf you are using a config file named something other than bud.config.js  you must specify its name with the --config option.\n\n${error}`, `There was a problem loading ${cfgPath}`);
    }
};
exports.handler = handler;
//# sourceMappingURL=build.js.map