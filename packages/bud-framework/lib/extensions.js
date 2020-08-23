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
exports.extensions = void 0;
/**
 * Extension controller.
 *
 * @this {Bud}
 */
var extensions = function (app, extension) { return ({
    app: app,
    extension: extension(app),
    /**
     * Build plugin.
     */
    build: function () {
        this.bindExtensionProps();
        this.setExtensionOptions();
        this.mergeExtensionOptions();
        return this.makeExtension();
    },
    /**
     * Bind plugin props
     */
    bindExtensionProps: function () {
        this.ensureExtensionProp('options', this.app.util.fab.undefined());
        this.ensureExtensionProp('when', this.app.util.fab["true"]);
        this.ensureExtensionProp('setOptions', this.app.util.fab.undefined);
        this.ensureExtensionProp('mergeOptions', this.app.util.fab.undefined);
    },
    /**
     * Ensure plugin prop is set.
     */
    ensureExtensionProp: function (prop, fallback) {
        this.extension[prop] = this.extension[prop] || fallback;
    },
    /**
     * Set plugin options.
     */
    setExtensionOptions: function () {
        this.boundValue = this.extension.setOptions();
        if (this.boundValue) {
            this.extension.options = this.boundValue;
        }
        delete this.boundValue;
    },
    /**
     * Merge plugin options.
     */
    mergeExtensionOptions: function () {
        this.boundValue = this.extension.mergeOptions();
        if (this.boundValue) {
            this.extension.options = __assign(__assign({}, this.extension.options), this.boundValue);
        }
        delete this.boundValue;
    },
    /**
     * Make plugin.
     */
    makeExtension: function () {
        this.extension =
            this.extension.when() && this.extension.make
                ? this.extension.make(this.app)
                : this.app.util.fab.undefined();
        if (this.extension) {
            return this.extension;
        }
    }
}); };
exports.extensions = extensions;
//# sourceMappingURL=extensions.js.map