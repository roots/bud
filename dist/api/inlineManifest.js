var inlineManifest = function (name) {
    this.logger.info({ name: 'bud.api', "function": 'bud.inlineManifest', options: { name: name } }, "bud.inlineManifest called");
    this.features.enable('inlineManifest');
    var value = this.hooks.filter('api.inlineManifest.filter', {
        name: name || 'runtime'
    });
    this.options.set('inlineManifest', value);
    return this;
};
export { inlineManifest };
//# sourceMappingURL=inlineManifest.js.map