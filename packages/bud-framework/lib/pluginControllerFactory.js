"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.pluginController = void 0;
var pluginController = function (app) { return ({
    app: app,
    use: function (plugin) {
        this.plugin = plugin(this.app);
        return this;
    },
    build: function () {
        this.bindProps();
        this.setOptions();
        this.mergeOptions();
        return this.make();
    },
    /**
     * Bind plugin props
     */
    bindProps: function () {
        var _this = this;
        var props = this.app.hooks.filter('framework.plugins.ensureProp', [
            ['options', this.app.util.fab.undefined()],
            ['when', this.app.util.fab["true"]],
            ['setOptions', this.app.util.fab.undefined],
            ['mergeOptions', this.app.util.fab.undefined],
        ]);
        props.map(function (_a) {
            var name = _a[0], value = _a[1];
            if (!_this.plugin.hasOwnProperty(name)) {
                _this.plugin[name] = value;
            }
        });
    },
    /**
     * Set plugin options.
     */
    setOptions: function () {
        this.boundValue = this.plugin.setOptions();
        if (this.boundValue) {
            this.plugin.options = this.boundValue;
        }
        delete this.boundValue;
    },
    /**
     * Merge plugin options.
     */
    mergeOptions: function () {
        this.boundValue = this.plugin.mergeOptions();
        if (this.boundValue) {
            this.plugin.options = __assign(__assign({}, this.plugin.options), this.boundValue);
        }
        delete this.boundValue;
    },
    /**
     * Make plugin.
     */
    make: function () {
        this.plugin =
            this.plugin.hasOwnProperty('when') && this.plugin.when()
                ? this.plugin.make()
                : this.app.util.fab.undefined();
        if (this.plugin) {
            return this.plugin;
        }
    }
}); };
exports.pluginController = pluginController;
//# sourceMappingURL=pluginControllerFactory.js.map