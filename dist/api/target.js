var target = function (target) {
    this.hooks.call('pre_target', target);
    this.options.set('target', this.hooks.filter('filter_target_option', target));
    this.hooks.call('post_target');
    return this;
};
export { target };
//# sourceMappingURL=target.js.map