import {Loose} from '@roots/container'
import {BudInterface, Plugin, PluginInterface} from './'

class PluginController {
  public bud: BudInterface
  public plugin: PluginInterface
  public options: Loose = {}

  public constructor(app: BudInterface, plugin: Plugin) {
    this.bud = app
    this.plugin = plugin(app)

    this.setOptions = this.setOptions.bind(this)
    this.mergeOptions = this.mergeOptions.bind(this)
    this.make = this.make.bind(this)
  }

  build(): any | void {
    this.setOptions()
    this.mergeOptions()

    return this.make()
  }

  setOptions(): void {
    if (this.plugin.setOptions) {
      const options = this.plugin.setOptions()

      if (options) {
        this.plugin.options = options
      }
    }
  }

  mergeOptions(): void {
    if (this.plugin.mergeOptions) {
      const options = this.plugin.mergeOptions()

      if (options) {
        this.plugin.options = {
          ...this.plugin.options,
          ...options,
        }
      }
    }
  }

  make(): any {
    if (this.plugin.when && this.plugin.when()) {
      return this.plugin.make()
    }
  }
}

export {PluginController as default}
