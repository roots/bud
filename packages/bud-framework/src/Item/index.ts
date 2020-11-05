/**
 * Build Item
 */
export class Item implements Framework.Item {
  bud: Framework.Bud
  ident?: Framework.Item['ident']
  loader?: Framework.Item['loader']
  options?: Framework.Item['options']
  query?: Framework.Item['query']

  constructor(
    bud: Framework.Bud,
    module: Framework.Item.Module,
  ) {
    this.bud = bud

    this.set(module)

    this.set = this.set.bind(this)
    this.make = this.make.bind(this)
  }

  /**
   * Prop map
   */
  public propMap: Framework.Item['propMap'] = function () {
    return {
      ident: [this.ident, this.bud],
      query: [this.query, this.bud],
      loader: [this.loader, this.bud.build.loaders],
      options: [this.options, this.bud],
    }
  }

  /**
   * Set the loader definition
   */
  public set: Framework.Item['set'] = function (
    module: Framework.Item.Module,
  ): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Get the loader ident
   */
  public getIdent: Framework.Item['getIdent'] = function () {
    return this.ident
  }

  /**
   * Set the loader ident
   */
  public setIdent: Framework.Item['setIdent'] = function (
    ident: Framework.Item.Module.Ident,
  ): void {
    this.ident = ident
  }

  /**
   * Get the loader ident
   */
  public getOptions: Framework.Item['getOptions'] = function () {
    return this.options
  }

  /**
   * Set the loader options
   */
  public setOptions: Framework.Item['setOptions'] = function (
    options: Framework.Item.Module.Options,
  ): void {
    this.options = options
  }

  /**
   * Get the loader ident
   */
  public getQuery: Framework.Item['getQuery'] = function () {
    return typeof this.query == 'function'
      ? this.query()
      : this.query
  }

  /**
   * Set the loader query
   */
  public setQuery: Framework.Item['setQuery'] = function (
    query: Framework.Item.Module.Query,
  ): void {
    this.query = query
  }

  /**
   * Get the loader ident
   */
  public getLoader: Framework.Item['getLoader'] = function () {
    return this.loader
  }

  /**
   * Set the loader
   */
  public setLoader: Framework.Item['setLoader'] = function (
    loader: Framework.Item.Module.Loader,
  ): void {
    this.loader = loader
  }

  /**
   * Make an item for use in a rule.
   */
  public make: Framework.Item['make'] = function (
    this: Framework.Item,
  ) {
    return (
      // Get the map of props to items
      Object.entries(this.propMap())
        // First out nullish values, etc.
        .filter(
          ([, [value]]: [
            string,
            [Framework.Item.Property, unknown],
          ]) => value !== null && value !== undefined,
        )
        // Then, reduce the set, tapping callables during translation
        .reduce(
          (
            fields: Framework.Build.RuleSetLoader,
            [property, [value, param]]: [
              string,
              [
                Framework.Item.MaybeCallable<
                  Framework.Item.Property
                >,
                unknown,
              ],
            ],
          ): Framework.Build.RuleSetLoader => {
            /**
             * A property value can be calculated
             * in a couple different ways.
             */
            const computed =
              // For loaders which are specified as a string
              property == 'loader' && typeof value == 'string'
                ? // Set the loader from that string
                  this.bud.build.getLoader(value)
                : // Otherwise, for functions
                typeof value == 'function'
                ? // Call them with the param from this.propMap
                  value(param)
                : // Else, just use the given value
                  value

            return {
              ...fields,
              [property]: computed,
            }
          },
          {},
        )
    )
  }
}
