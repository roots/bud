interface Value<T> {
  identity: T
}

class Value<T> {
  public constructor(public identity: T) {}

  public get() {
    return this.identity
  }

  public set(identity: T) {
    this.identity = identity
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

export default Value
