import { join } from 'path';
var srcPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.srcPath', dir: dir }, "bud.srcPath called");
    var setPath = join(this.paths.get('project'), dir);
    /**
     * If set, CLI arguments take precendence over config.
     */
    !this.args.get('src') && this.paths.set('src', setPath);
    return this;
};
export { srcPath };
//# sourceMappingURL=srcPath.js.map