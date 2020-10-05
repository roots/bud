import type Bud from '../../Bud'

class Use implements Bud.Build.Use {
  bud: Bud

  ident?: Bud.Build.Use.Property

  loader?: Bud.Build.Use.Property

  options?: Bud.Build.Use.Property

  query?: Bud.Build.Use.Property

  constructor(bud: Bud, rule: Bud.Build.Use.Module) {
    this.bud = bud

    this.set(rule)

    this.get.bind(this)
    this.set.bind(this)
    this.make.bind(this)
  }

  /**
   * Set the loader definition
   */
  public set(rule: Bud.Build.Use.Module): void {
    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })
  }

  public get(): Bud.Build.Use.Module {
    return {
      ident: this.ident,
      loader: this.loader,
      options: this.options,
      query: this.query,
    }
  }

  public make(): Bud.Build.Use.Product {
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Bud.Build.Use.Product,
          [key, value]: [
            string,
            Bud.Build.Use.Factory | unknown,
          ],
        ) => ({
          ...fields,
          [key]: typeof value == 'function' ? value() : value,
        }),
        {},
      )
  }
}

export default Use
