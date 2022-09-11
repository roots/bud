export default class Value<T> {
  public constructor(public identity: T) {}

  public get() {
    return Value.get(this)
  }

  public set(value: T) {
    this.identity = value
  }

  public static make<T>(value: T) {
    return new Value(value)
  }

  public static get<T>(value?: Value<T>) {
    return Value.isValue(value) ? value.identity : value
  }

  public static isValue<T>(value: Value<T> | T): value is Value<T> {
    return value instanceof Value
  }

  public static typeOf<T>(value: Value<T> | T): string {
    return Value.isValue(value) ? typeof value.identity : typeof value
  }
}
