import { join } from 'path';
var distPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.distPath', dir: dir }, "bud.distPath called");
    var value = this.hooks.filter('api.distPath.filter', join(this.paths.get('project'), dir));
    this.paths.set('dist', value);
    return this;
};
export { distPath };
//# sourceMappingURL=distPath.js.map