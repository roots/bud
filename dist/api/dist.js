import { join } from 'path';
var dist = function (path) {
    this.logger.info({ name: 'bud.api', "function": 'bud.dist', path: path }, "bud.dist called");
    return path ? join(this.paths.get('dist'), path) : this.paths.get('dist');
};
export { dist };
//# sourceMappingURL=dist.js.map