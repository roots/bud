"use strict";
exports.__esModule = true;
exports.api = void 0;
var alias_1 = require("./alias");
var auto_1 = require("./auto");
var babel_1 = require("./babel");
var bundle_1 = require("./bundle");
var compile_1 = require("./compile");
var copy_1 = require("./copy");
var copyAll_1 = require("./copyAll");
var dist_1 = require("./dist");
var distPath_1 = require("./distPath");
var devtool_1 = require("./devtool");
var glob_1 = require("./glob");
var hash_1 = require("./hash");
var hot_1 = require("./hot");
var manifest_1 = require("./manifest");
var runtimeManifest_1 = require("./runtimeManifest");
var map_1 = require("./map");
var mini_1 = require("./mini");
var postcss_1 = require("./postcss");
var preset_1 = require("./preset");
var project_1 = require("./project");
var projectPath_1 = require("./projectPath");
var publicPath_1 = require("./publicPath");
var splitting_1 = require("./splitting");
var src_1 = require("./src");
var srcPath_1 = require("./srcPath");
var sync_1 = require("./sync");
var target_1 = require("./target");
var terser_1 = require("./terser");
var use_1 = require("./use");
var vendor_1 = require("./vendor");
var watch_1 = require("./watch");
/**
 * Bud.Bud export
 */
exports.api = {
    alias: alias_1.alias,
    auto: auto_1.auto,
    babel: babel_1.babel,
    bundle: bundle_1.bundle,
    compile: compile_1.compile,
    copy: copy_1.copy,
    copyAll: copyAll_1.copyAll,
    devtool: devtool_1.devtool,
    dist: dist_1.dist,
    distPath: distPath_1.distPath,
    glob: glob_1.glob,
    hash: hash_1.hash,
    hot: hot_1.hot,
    manifest: manifest_1.manifest,
    map: map_1.map,
    mini: mini_1.mini,
    postcss: postcss_1.postcss,
    preset: preset_1.preset,
    project: project_1.project,
    projectPath: projectPath_1.projectPath,
    publicPath: publicPath_1.publicPath,
    runtimeManifest: runtimeManifest_1.runtimeManifest,
    splitting: splitting_1.splitting,
    src: src_1.src,
    srcPath: srcPath_1.srcPath,
    sync: sync_1.sync,
    target: target_1.target,
    terser: terser_1.terser,
    use: use_1.use,
    vendor: vendor_1.vendor,
    watch: watch_1.watch
};
//# sourceMappingURL=index.js.map