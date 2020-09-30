// Type definitions for Bud.Use
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import Bud from '..'

export default Use

declare class Use {
  ident?: Bud.Use.Property
  loader?: Bud.Use.Property
  options?: Bud.Use.Property
  query?: Bud.Use.Property

  /**
   * Bud instance
   */
  bud: Bud

  /**
   * Instantiate with the bud
   * instance and an imported loader
   */
  constructor(bud: unknown, module: Bud.Use.Module)

  /**
   * Get the loader definition
   */
  get(): Bud.Use.Module

  /**
   * Set the loader definition
   */
  set(loader: Bud.Use.Module): void

  /**
   * Use conforming to Webpack API.
   */
  make(): Bud.Use.Product
}
