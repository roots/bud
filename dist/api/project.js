import { join } from 'path';
var project = function (path) {
    this.logger.info({ name: 'bud.api', "function": 'bud.project', path: path }, "bud.project called");
    return path ? join(this.paths.get('project'), path) : this.paths.get('project');
};
export { project };
//# sourceMappingURL=project.js.map