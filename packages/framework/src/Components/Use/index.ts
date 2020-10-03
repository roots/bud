import Webpack from 'webpack'

class Use implements Use.Interface {
  bud: any

  ident?: Use.Property

  loader?: Use.Property

  options?: Use.Property

  query?: Use.Property

  constructor(bud: any, rule: Use.Module) {
    this.bud = bud

    this.set(rule)

    this.get.bind(this)
    this.set.bind(this)
    this.make.bind(this)
  }

  /**
   * Set the loader definition
   */
  public set(rule): void {
    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })
  }

  public get(): Use.Module {
    return {
      ident: this.ident,
      loader: this.loader,
      options: this.options,
      query: this.query,
    }
  }

  public make(): Use.Product {
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Use.Product,
          [key, value]: [string, Use.Factory | unknown],
        ) => ({
          ...fields,
          [key]: typeof value == 'function' ? value() : value,
        }),
        {},
      )
  }
}

declare namespace Use {
  export interface Interface {
    bud: any

    ident?: Use.Property

    loader?: Use.Property

    options?: Use.Property

    query?: Use.Property

    /**
     * Get the loader definition
     */
    get: () => Use.Module

    /**
     * Set the loader definition
     */
    set: (loader: Use.Module) => void

    /**
     * Use conforming to Webpack API.
     */
    make: () => Use.Product
  }

  export type Product = Webpack.RuleSetLoader

  export type Literal = string | Webpack.RuleSetQuery | undefined

  export type Module = {
    [key: string]: Factory | Literal
  }

  export interface Factory {
    (this: any): Literal
  }

  export type Property = Literal | Factory

  export type RepositoryFactory = (
    bud: unknown,
  ) => {[key: string]: Use}
}

export default Use
