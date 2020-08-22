/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { alias } from './alias.js';
import { auto } from './auto.js';
import { babel } from './babel.js';
import { bundle } from './bundle.js';
import { compile } from './compile.js';
import { config } from './config.js';
import { copy } from './copy.js';
import { copyAll } from './copyAll.js';
import { dist } from './dist.js';
import { distPath } from './distPath.js';
import { devtool } from './devtool.js';
import { glob } from './glob.js';
import { hash } from './hash.js';
import { hot } from './hot.js';
import { manifest } from './manifest.js';
import { runtimeManifest } from './runtimeManifest.js';
import { map } from './map.js';
import { mini } from './mini.js';
import { postcss } from './postcss.js';
import { preset } from './preset.js';
import { project } from './project.js';
import { projectPath } from './projectPath.js';
import { publicPath } from './publicPath.js';
import { splitting } from './splitting.js';
import { src } from './src.js';
import { srcPath } from './srcPath.js';
import { sync } from './sync.js';
import { target } from './target.js';
import { terser } from './terser.js';
import { use } from './use.js';
import { vendor } from './vendor.js';
import { watch } from './watch.js';

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
    postcss: postcss,
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

export { api };
