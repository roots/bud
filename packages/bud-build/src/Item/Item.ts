import {Framework, Item} from '@roots/bud-typings'
import {Service, isFunction} from '@roots/bud-support'

export default abstract class
  extends Service<Framework>
  implements Item {
  /**
   * Item module
   */
  protected module: Item.Module

  /**
   * Register item module.
   */
  public abstract register(module: Item.Module): void

  /**
   * Make the item for use in a rule.
   */
  public abstract make(): Item.RuleSetLoader

  /**
   * Get the loader ident
   */
  public get ident(): Item.Module.Ident {
    return isFunction(this.module['ident'])
      ? this.module['ident'](this.app)
      : this.module['ident']
  }

  /**
   * Set the loader ident
   */
  public set ident(ident: Item.Module.Ident) {
    this.module['ident'] = ident
  }

  /**
   * Get the loader ident
   */
  public get options(): Item.Module.Options {
    return isFunction(this.module['options'])
      ? this.module['options'](this.app)
      : this.module['options']
  }

  /**
   * Set the loader options
   */
  public set options(options: Item.Module.Options) {
    this.module['options'] = options
  }

  /**
   * Get the loader ident
   */
  public get query(): Item.Module.Query {
    return isFunction(this.module['query'])
      ? this.module['query'](this.app)
      : this.module['query']
  }

  /**
   * Set the loader query
   */
  public set query(query: Item.Module.Query) {
    this.module['query'] = query
  }

  /**
   * Get the loader ident
   */
  public get loader(): Item.Module.Loader {
    return this.app.build.getLoader(this.module['loader'])
  }

  /**
   * Set the loader
   */
  public set loader(loader: Item.Module.Loader) {
    this.module['loader'] = loader
  }
}
