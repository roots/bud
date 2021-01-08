"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glob = void 0;
const glob = function (name, files, options) {
    const project = this.disk.get('project');
    this.store.get('config').merge('entry', project.glob
        .sync(files, options !== null && options !== void 0 ? options : { expandDirectories: true })
        .reduce((acc, curr) => {
        const basedName = (file) => {
            const ext = `.${file.split('.').pop()}`;
            return project.path.basename(file, ext);
        };
        return Object.assign(Object.assign({}, acc), { [project.path.join(name ? `${name}/` : '/', basedName(curr))]: curr });
    }, {}));
    return this;
};
exports.glob = glob;
//# sourceMappingURL=glob.js.map