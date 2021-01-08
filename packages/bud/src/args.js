"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distPath = exports.srcPath = exports.projectPath = exports.vendor = exports.template = exports.runtime = exports.minify = exports.hash = exports.gzip = exports.devtool = exports.brotli = void 0;
/**
 * Brotli flag
 */
const brotli = (bud) => {
    bud.store.has('args.brotli') && bud.brotli();
};
exports.brotli = brotli;
/**
 * Devtool flag/argument
 */
const devtool = (bud) => {
    bud.store.has('args.devtool') &&
        exports.devtool(bud.store.get('args.devtool'));
};
exports.devtool = devtool;
/**
 * Gzip flag
 */
const gzip = (bud) => {
    bud.store.isTrue('args.gzip') && bud.gzip();
};
exports.gzip = gzip;
/**
 * Hash flag
 */
const hash = (bud) => {
    bud.store.has('args.hash') && bud.hash();
};
exports.hash = hash;
/**
 * Minify flag
 */
const minify = (bud) => {
    bud.store.has('args.minify') && bud.minify();
};
exports.minify = minify;
/**
 * Runtime flag
 */
const runtime = (bud) => {
    bud.store.has('args.runtime') && bud.runtime();
};
exports.runtime = runtime;
/**
 * Template flag
 */
const template = (bud) => {
    bud.store.has('args.html') && bud.template();
};
exports.template = template;
/**
 * Vendor flag
 */
const vendor = (bud) => {
    bud.store.has('args.vendor') && bud.vendor();
};
exports.vendor = vendor;
/**
 * Project path
 */
const projectPath = (bud) => {
    bud.projectPath(bud.store.has('args.project')
        ? bud.disk
            .get('project')
            .path.resolve(bud.disk.baseDir, bud.store.get('args.project'))
        : bud.disk.baseDir);
};
exports.projectPath = projectPath;
/**
 * Src path
 */
const srcPath = (bud) => {
    bud.srcPath(bud.store.has('args.src')
        ? bud.store.get('args.src')
        : 'src');
};
exports.srcPath = srcPath;
/**
 * Dist path
 */
const distPath = (bud) => {
    bud.distPath(bud.store.has('args.dist')
        ? bud.store.get('args.dist')
        : 'dist');
};
exports.distPath = distPath;
//# sourceMappingURL=args.js.map