/**
 * Build Item
 *
 * @description loader implementation
 */
class Item {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   */
  bud: Framework.Bud

  /**
   * Ident
   */
  ident?: Build.Item['ident']

  /**
   * Loader
   */
  loader?: Build.Item['loader']

  /**
   * Options
   */
  options?: Build.Item['options']

  /**
   * Query
   */
  query?: Build.Item['query']

  /**
   * Creates an instance of Item.
   *
   * @param {Bud} bud
   * @param {Build.Item.Module} rule
   */
  constructor(bud: Framework.Bud, module: Build.Item.Module) {
    this.bud = bud

    this.set(module)

    this.set = this.set.bind(this)
    this.make = this.make.bind(this)
  }

  /**
   * Set the loader definition
   */
  public set: Build.Item['set'] = function (
    module: Build.Item.Module,
  ): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Set the loader ident
   */
  public setIdent: Build.Item['setIdent'] = function (
    ident: Build.Item.Module.Ident,
  ): void {
    this.ident = ident
  }

  /**
   * Set the loader options
   */
  public setOptions: Build.Item['setOptions'] = function (
    options: Build.Item.Module.Options,
  ): void {
    this.options = options
  }

  /**
   * Set the loader query
   */
  public setQuery: Build.Item['setQuery'] = function (
    query: Build.Item.Module.Query,
  ): void {
    this.query = query
  }

  /**
   * Set the loader
   */
  public setLoader: Build.Item['setLoader'] = function (
    loader: Build.Item.Module.Loader,
  ): void {
    this.loader = loader
  }

  /**
   * Make
   */
  public make: Build.Item['make'] = function (this: Build.Item) {
    // Map registered props to the params provided to extensions
    const propMap = Object.entries({
      ident: [this.ident, this.bud],
      query: [this.query, this.bud],
      loader: [this.loader, this.bud.components['loaders']],
      options: [this.options, this.bud],
    })

    // Filter to the workable subset.
    const valid: Build.Item.Valid = propMap.filter(
      ([, [value]]: [string, [Build.Item.Property, unknown]]) =>
        value !== null && value !== undefined,
    )

    // Reduce the set, tapping callables in translation
    const product: Build.Item.Product = valid.reduce(
      (
        fields: Build.Item.Product,
        [property, [value, param]]: [
          string,
          [
            Build.Item.MaybeCallable<Build.Item.Property>,
            unknown,
          ],
        ],
      ): Build.Item.Product => ({
        ...fields,
        [property]:
          typeof value == 'function' ? value(param) : value,
      }),
      {},
    )

    // Yield the ultimate RuleSetLoader
    return product
  }
}

export default Item
