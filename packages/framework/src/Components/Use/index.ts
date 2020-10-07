import type Bud from '../../Bud'

/**
 * Build Use
 *
 * @description loader implementation
 *
 * @class Use
 * @implements {Build.Use}
 */
class Use implements Build.Use {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   * @memberof Use
   */
  bud: Bud

  /**
   * Ident
   *
   * @type {Build.Use.Property}
   */
  ident?: Build.Use.Property

  /**
   * Loader
   *
   * @type {Build.Use.Property}
   */
  loader?: Build.Use.Property

  /**
   * Options
   *
   * @type {Build.Use.Property}
   */
  options?: Build.Use.Property

  /**
   * Query
   *
   * @type {Build.Use.Property}
   */
  query?: Build.Use.Property

  /**
   * Creates an instance of Use.
   *
   * @param {Bud} bud
   * @param {Build.Use.Module} rule
   * @memberof Use
   */
  constructor(bud: Bud, rule: Build.Use.Module) {
    this.bud = bud

    this.set(rule)

    this.get.bind(this)
    this.set.bind(this)
    this.make.bind(this)
  }

  /**
   * Set the loader definition
   *
   * @param {Build.Use.Module} rule
   * @memberof Use
   */
  public set(rule: Build.Use.Module): void {
    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })
  }

  /**
   * Get
   *
   * @returns {Build.Use.Module}
   * @memberof Use
   */
  public get(): Build.Use.Module {
    return {
      ident: this.ident,
      loader: this.loader,
      options: this.options,
      query: this.query,
    }
  }

  /**
   * Make
   *
   * @returns {Build.Use.Product}
   * @memberof Use
   */
  public make(): Build.Use.Product {
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Build.Use.Product,
          [key, value]: [string, Build.Use.Factory | unknown],
        ) => ({
          ...fields,
          [key]: typeof value == 'function' ? value() : value,
        }),
        {},
      )
  }
}

export default Use
