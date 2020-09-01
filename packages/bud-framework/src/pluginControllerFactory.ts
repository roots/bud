import {PluginController} from '@roots/bud-typings'

const pluginController: PluginController = app => ({
  app,

  use: function (plugin) {
    this.plugin = plugin(this.app)

    return this
  },

  build: function () {
    this.bindProps()
    this.setOptions()
    this.mergeOptions()

    return this.make()
  },

  /**
   * Bind plugin props
   */
  bindProps: function (): void {
    const props = this.app.hooks.filter(
      'framework.plugins.ensureProp',
      [
        ['options', this.app.util.fab.undefined()],
        ['when', this.app.util.fab.true],
        ['setOptions', this.app.util.fab.undefined],
        ['mergeOptions', this.app.util.fab.undefined],
      ],
    )

    props.map(([name, value]) => {
      if (!this.plugin.hasOwnProperty(name)) {
        this.plugin[name] = value
      }
    })
  },

  /**
   * Set plugin options.
   */
  setOptions: function () {
    this.boundValue = this.plugin.setOptions()

    if (this.boundValue) {
      this.plugin.options = this.boundValue
    }

    delete this.boundValue
  },

  /**
   * Merge plugin options.
   */
  mergeOptions: function () {
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
  make: function () {
    this.plugin =
      this.plugin.hasOwnProperty('when') && this.plugin.when()
        ? this.plugin.make()
        : this.app.util.fab.undefined()

    if (this.plugin) {
      return this.plugin
    }
  },
})

export {pluginController}
