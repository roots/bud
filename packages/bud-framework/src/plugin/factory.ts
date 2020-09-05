import {PluginController} from '@roots/bud-typings'

const factory: PluginController = function (): void {
  this.use = function (framework, plugin) {
    this.bud = framework
    this.plugin = plugin(this.bud)

    this.setOptions = this.setOptions.bind(this)
    this.mergeOptions = this.mergeOptions.bind(this)
    this.make = this.make.bind(this)

    return this
  }

  /**
   * Build a plugin object
   */
  this.build = function () {
    this.bindProps()
    this.setOptions()
    this.mergeOptions()

    return this.make()
  }

  /**
   * Bind plugin props
   */
  this.bindProps = function (): void {
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
  }

  /**
   * Set plugin options.
   */
  this.setOptions = function () {
    this.boundValue = this.plugin.setOptions()

    if (this.boundValue) {
      this.plugin.options = this.boundValue
    }

    delete this.boundValue
  }

  /**
   * Merge plugin options.
   */
  this.mergeOptions = function () {
    this.boundValue = this.plugin.mergeOptions()

    if (this.boundValue) {
      this.plugin.options = {
        ...this.plugin.options,
        ...this.boundValue,
      }
    }

    delete this.boundValue
  }

  /**
   * Make plugin.
   */
  this.make = function () {
    this.plugin =
      this.plugin.hasOwnProperty('when') && this.plugin.when()
        ? this.plugin.make()
        : null

    if (this.plugin) {
      return this.plugin
    }
  }
}

export {factory as default}
