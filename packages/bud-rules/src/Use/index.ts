import Bud from '@roots/bud-types'
/**
 * Bud loader object
 */
export default class {
  public bud: Bud

  public query: Bud.Use.Property
  public ident: Bud.Use.Property
  public loader: Bud.Use.Property
  public options: Bud.Use.Property

  constructor(bud: Bud, module: Bud.Use.Module) {
    this.bud = bud

    Object.entries(module).forEach(([property, value]) => {
      Object.assign(this, property, value)

      if (typeof this[property] == 'function') {
        Object.assign(this, property, this[property].bind(this))
      }
    })

    this.get.bind(this)
    this.set.bind(this)
  }

  public get(): Bud.Use.Module {
    return {
      ident: this.ident,
      loader: this.loader,
      options: this.options,
      query: this.query,
    }
  }

  public set(module: Bud.Use.Module): void {
    Object.entries(module).forEach(([property, value]) => {
      Object.assign(this, property, value)
    })
  }

  make(): Bud.Use.Product {
    return Object.entries(this.get()).reduce(
      (properties, [prop, val]: [string, Bud.Use.Property]) => ({
        ...properties,
        [prop]:
          typeof val == 'function' ? val.bind(this)() : val,
      }),
      {},
    )
  }
}
