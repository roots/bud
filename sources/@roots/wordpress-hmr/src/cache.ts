type Context = __WebpackModuleApi.RequireContext

export class Cache {
  public store: {[key: string]: Context} = {}

  public get(key: string): Context {
    return this.store[key]
  }

  public has(key: string): boolean {
    return typeof this.store[key] !== `undefined`
  }

  public is(key: string, value: Context): boolean {
    return this.store[key] === value
  }

  public set(key: string, value: Context): void {
    this.store[key] = value
  }
}
