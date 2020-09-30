import Bud from '@roots/bud-types'
import Container, {Loose} from '@roots/container'

export abstract class Controller extends Container {
  public bud: Bud

  public store: Bud.Framework.Container
  public plugin?: Bud.Plugin.Extension | Bud.Plugin.WebpackPlugin

  public constructor(bud: Bud) {
    super()

    this.bud = bud
    this.store = this.bud.makeContainer()
    this.register = this.register.bind(this)
  }

  /**
   * Register extension
   */
  public register(
    name: string,
    plugin: Bud.Plugin.Factory,
  ): Bud {
    // Plugin factories are passed Bud and return plugins.
    const instance = plugin(this.bud)

    // Set a new key for the plugin in the options store.
    this.store.set(name, instance.options ?? {})

    // Intercept get/set on the plugin options properties and redirect to the options store.
    Object.defineProperty(instance, 'options', {
      get: this.store.get(name),
      set: (v: Loose) => this.store.set(name, v),
    })

    // Set the extension/plugin to the base repository.
    this.set(name, instance)

    // Return fluent.
    return this.bud
  }

  /**
   * Select extension
   */
  public select(name: string): this {
    this.plugin = this.get(name)

    return this
  }

  /**
   * Remove extension
   */
  public remove(name: string): this {
    this.has(name) && this.delete(name)

    return this
  }
}

export {Controller as default}
