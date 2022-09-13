export default class Value<T> {
  public constructor(public identity: T) {}

  public get() {
    return this.identity
  }

  public set(value: T) {
    this.identity = value
  }

  public static make<T>(value: T) {
    return Value.is(value) ? value : new Value(value)
  }

  public static get<T>(value?: Value<T>) {
    return Value.is(value) ? value.get() : value
  }

  public static is<T>(value: Value<T> | T): value is Value<T> {
    return value instanceof Value
  }

  public static typeOf<T>(value: Value<T> | T): string {
    return Value.is(value) ? typeof value.identity : typeof value
  }
}
