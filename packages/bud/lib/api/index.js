"use strict";
exports.__esModule = true;
exports.api = void 0;
var addExtensions_1 = require("./addExtensions");
var alias_1 = require("./alias");
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
var dev_1 = require("./dev");
var manifest_1 = require("./manifest");
var runtimeManifest_1 = require("./runtimeManifest");
var map_1 = require("./map");
var mini_1 = require("./mini");
var postcss_1 = require("./postcss");
var preset_1 = require("./preset");
var project_1 = require("./project");
var projectPath_1 = require("./projectPath");
var provide_1 = require("./provide");
var publicPath_1 = require("./publicPath");
var src_1 = require("./src");
var srcPath_1 = require("./srcPath");
var target_1 = require("./target");
var terser_1 = require("./terser");
var use_1 = require("./use");
var vendor_1 = require("./vendor");
/**
 * Bud.Bud export
 */
exports.api = {
    addExtensions: addExtensions_1.addExtensions,
    alias: alias_1.alias,
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
    dev: dev_1.dev,
    manifest: manifest_1.manifest,
    map: map_1.map,
    mini: mini_1.mini,
    postcss: postcss_1.postcss,
    preset: preset_1.preset,
    project: project_1.project,
    projectPath: projectPath_1.projectPath,
    provide: provide_1.provide,
    publicPath: publicPath_1.publicPath,
    runtimeManifest: runtimeManifest_1.runtimeManifest,
    src: src_1.src,
    srcPath: srcPath_1.srcPath,
    target: target_1.target,
    terser: terser_1.terser,
    use: use_1.use,
    vendor: vendor_1.vendor
};
//# sourceMappingURL=index.js.map