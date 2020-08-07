var src = function (path) {
    var srcDir = this.paths.get('src');
    return path ? this.fs.path.join(srcDir, path) : srcDir;
};
export { src };
//# sourceMappingURL=src.js.map