/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { __assign } from 'tslib';

/**
 * Extension controller.
 *
 * @this {Bud}
 */
var extensionFactory = function (bud, extension) { return ({
    bud: bud,
    extension: extension(bud),
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
        this.ensureExtensionProp('bud', this.bud);
        this.ensureExtensionProp('options', this.bud.util.fab.undefined());
        this.ensureExtensionProp('when', this.bud.util.fab["true"]);
        this.ensureExtensionProp('setOptions', this.bud.util.fab.undefined);
        this.ensureExtensionProp('mergeOptions', this.bud.util.fab.undefined);
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
                ? this.extension.make(this.bud)
                : this.bud.util.fab.undefined();
        if (this.extension) {
            return this.extension;
        }
    },
}); };

export { extensionFactory };
