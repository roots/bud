import {Service} from '@roots/bud-support'
import type {Framework, Hooks} from '@roots/bud-typings'
import Items from './Items'

export default abstract class extends Service<Framework> {
  /**
   * Store
   */
  protected _store: Hooks.Store.Items

  /**
   * Class constructor
   */
  public constructor({app}: {app: Framework}) {
    super({app})

    this._store = {
      filters: new Items({app}),
      actions: new Items({app}),
    }
  }

  /**
   * Get store accessor
   */
  public get store(): Hooks.Store.Items {
    return this._store
  }

  /**
   * Set store accessor
   */
  public set store(store: Hooks.Store.Items) {
    this._store = store
  }

  /**
   * Actions accessor
   */
  public get actions(): Hooks.Store.Actions {
    return this.store.actions
  }

  /**
   * Filters accessor
   */
  public get filters(): Hooks.Store.Filters {
    return this.store.filters
  }
}
