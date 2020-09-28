import Bud from '@roots/bud-types'
import {Loose} from '@roots/container'

class PluginController {
  public bud: Bud

  public plugin: any

  public options: Loose = {}

  public constructor(app: Bud, plugin: Bud.Plugin.Factory) {
    this.bud = app
    this.plugin = plugin(app)

    this.setOptions = this.setOptions.bind(this)
    this.mergeOptions = this.mergeOptions.bind(this)
    this.make = this.make.bind(this)
  }

  build(): unknown | void {
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

  make(): unknown {
    if (this.plugin.when && this.plugin.when()) {
      return this.plugin.make()
    }
  }
}

export {PluginController as default}
