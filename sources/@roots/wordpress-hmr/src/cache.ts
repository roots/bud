type Module = any

export class Cache {
  public store: {[key: string]: Module} = {}

  public has(key: string): boolean {
    return typeof this.store[key] !== `undefined`
  }

  public set(key: string, value: Module): void {
    this.store[key] = value
  }

  public get(key: string): Module {
    return this.store[key]
  }

  public is(key: string, value: Module): boolean {
    return this.store[key] === value
  }
}
