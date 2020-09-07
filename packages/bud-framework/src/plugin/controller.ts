import {PluginControllerFactory} from '@roots/bud-typings'

const controller: PluginControllerFactory = bud => ({
  bud,

  /**
   * Use
   */
  use: function (plugin) {
    this.setOptions = this.setOptions.bind(this)
    this.mergeOptions = this.mergeOptions.bind(this)
    this.make = this.make.bind(this)

    this.plugin = plugin(this.bud)

    return this
  },

  /**
   * Build a plugin object
   */
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
    const props = this.bud.hooks.filter(
      'framework.plugins.ensureProp',
      [
        ['bud', this.bud],
        ['options', null],
        ['when', () => true],
        ['setOptions', () => null],
        ['mergeOptions', () => null],
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
    if (this.plugin.when()) {
      return this.plugin.make()
    }
  },
})

export {controller as default}
