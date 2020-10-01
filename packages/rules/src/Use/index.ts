import Bud from '@roots/bud-types'
/**
 * Bud loader object
 */
export default class {
  private bud: Bud
  public query: Bud.Use.Property
  public ident: Bud.Use.Property
  public loader: Bud.Use.Property
  public options: Bud.Use.Property

  constructor(bud: Bud, rule: Bud.Use.Module) {
    this.bud = bud

    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })

    this.get.bind(this)
    this.make.bind(this)
  }

  public get(): Bud.Use.Module {
    return {
      ident: this.ident,
      loader: this.loader,
      options: this.options,
      query: this.query,
    }
  }

  public make(): Bud.Rule.Makes {
    /**
     * Out of all entries, filter out the nullish/undefined values
     * and call the functional ones.
     */
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Bud.Use.Product,
          [key, value]: [string, Bud.Use.Factory | unknown],
        ) => ({
          ...fields,
          [key]: typeof value == 'function' ? value() : value,
        }),
        {},
      )
  }
}
