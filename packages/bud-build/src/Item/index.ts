import Framework from '@roots/bud-typings'

export {Item, Item as default}

type Contract = Framework.Item.Contract
type Module = Framework.Item.Module
type RuleSetLoader = Framework.Item.RuleSetLoader

class Item implements Contract {
  bud: Framework.Bud.Bud

  ident?: Contract['ident']

  loader?: Contract['loader']

  options?: Contract['options']

  query?: Contract['query']

  constructor(bud: Framework.Bud.Bud, module: Module) {
    this.set = this.set.bind(this)
    this.make = this.make.bind(this)

    this.bud = bud
    this.set(module)
  }

  /**
   * Prop map
   */
  public propMap: Contract['propMap'] = function() {
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
  public set: Contract['set'] = function(module: Module): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Get the loader ident
   */
  public getIdent: Contract['getIdent'] = function() {
    return this.ident
  }

  /**
   * Set the loader ident
   */
  public setIdent = function(ident: Module['ident']): void {
    this.ident = ident
  }

  /**
   * Get the loader ident
   */
  public getOptions = function(): Module['options'] {
    return this.options
  }

  /**
   * Set the loader options
   */
  public setOptions = function(
    options: Module['options'],
  ): void {
    this.options = options
  }

  /**
   * Get the loader ident
   */
  public getQuery = function(): Item['query'] {
    return typeof this.query == 'function'
      ? this.query()
      : this.query
  }

  /**
   * Set the loader query
   */
  public setQuery = function(query: Module['query']): void {
    this.query = query
  }

  /**
   * Get the loader ident
   */
  public getLoader = function(): Item['loader'] {
    return this.loader
  }

  /**
   * Set the loader
   */
  public setLoader: Contract['setLoader'] = function(
    loader: Module['loader'],
  ): void {
    this.loader = loader
  }

  /**
   * Make an item for use in a rule.
   */
  public make: Contract['make'] = function() {
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
            fields: RuleSetLoader,
            [property, [value, param]]: [
              string,
              [
                Framework.MaybeCallable<Framework.Item.Property>,
                unknown,
              ],
            ],
          ): RuleSetLoader => {
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
