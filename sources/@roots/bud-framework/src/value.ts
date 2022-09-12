export default class Value<T> {
  public identifier: string

  public constructor(public identity: T) {}

  public get() {
    return Value.get(this)
  }

  public set(value: T) {
    this.identity = value
  }

  public getIdentifier() {
    return this.identifier
  }

  public setIdentifier(identifier: string) {
    this.identifier = identifier
  }

  public static make<T>(value: T) {
    return new Value(value)
  }

  public static get<T>(value?: Value<T>) {
    return Value.is(value) ? value.identity : value
  }

  public static is<T>(value: Value<T> | T): value is Value<T> {
    return value instanceof Value
  }

  public static typeOf<T>(value: Value<T> | T): string {
    return Value.is(value) ? typeof value.identity : typeof value
  }
}
