import type Bud from '../../../Bud'
import type Webpack from 'webpack'

export {Use}

declare class Use {
  bud: Bud

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

declare namespace Use {
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
