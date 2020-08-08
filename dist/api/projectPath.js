var projectPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.projectPath', dir: dir }, "bud.projectPath called");
    this.paths.set('project', dir);
    return this;
};
export { projectPath };
//# sourceMappingURL=projectPath.js.map