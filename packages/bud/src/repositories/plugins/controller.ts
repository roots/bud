import type {Bud, Controller} from './types'

/**
 * Plugin controller.
 *
 * @this {Bud}
 */
const controller = (bud: Bud): Controller => ({
  bud,

  /**
   * Build plugin.
   */
  build: function (extension) {
    this.plugin = extension()

    this.bindPluginProps()
    this.setPluginOptions()
    this.mergePluginOptions()

    return this.makePlugin()
  },

  /**
   * Bind plugin props
   */
  bindPluginProps: function (): void {
    this.ensurePluginProp('bud', this.bud)
    this.ensurePluginProp('options', this.bud.util.fab.undefined())
    this.ensurePluginProp('setOptions', this.bud.util.fab.undefined)
    this.ensurePluginProp('mergeOptions', this.bud.util.fab.undefined)
    this.ensurePluginProp('when', this.bud.util.fab.true)
  },

  /**
   * Ensure plugin prop is set.
   */
  ensurePluginProp: function (prop, fallback): void {
    this.plugin[prop] = this.plugin[prop] || fallback
  },

  /**
   * Set plugin options.
   */
  setPluginOptions: function (): void {
    this.boundValue = this.plugin.setOptions()

    if (this.boundValue) {
      this.plugin.options = this.boundValue
    }

    delete this.boundValue
  },

  /**
   * Merge plugin options.
   */
  mergePluginOptions: function (): void {
    this.boundValue = this.plugin.mergeOptions()

    if (this.boundValue) {
      this.plugin.options = {
        ...this.plugin.options,
        ...this.boundValue,
      }
    }

    delete this.boundValue
  },

  /**
   * Make plugin.
   */
  makePlugin: function (): any {
    this.plugin =
      this.plugin.when() && this.plugin.make
        ? this.plugin.make(this.bud)
        : this.bud.util.fab.undefined()

    if (this.plugin) {
      return this.plugin
    }
  },
})

export {controller}
