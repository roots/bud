interface Value<T> {
  isBudValue: true
  identity: T
}

class Value<T> {
  /**
   * For type checking
   */
  public isBudValue: true = true

  /**
   * Class constructor
   *
   * @remarks
   * Singleton pattern. Use {@link Value.make} to create a {@link Value} instance.
   *
   * @param identity - Value
   * @private
   */
  public constructor(public identity: T) {}

  /**
   * Get value of {@link Value.identity}
   */
  public get() {
    return this.identity
  }

  /**
   * Make {@link Value} instance
   */
  public static make<T>(value: T, ..._args: any[]): Value<T> {
    return Value.isValue(value) ? value : new Value(value)
  }

  /**
   * Check {@link Value.identity} type
   */
  public static typeOf<T>(value: Value<T> | T): string {
    return Value.isValue(value) ? typeof value.identity : typeof value
  }

  public static isCallable<T>(
    value: Value<T> | T,
  ): value is T & CallableFunction {
    return Value.typeOf(value) === `function`
  }

  /**
   * Check {@link Value.identity} type
   */
  public static isValue<T>(value: Value<T> | T): value is Value<T> {
    return (
      typeof value === `object` &&
      value !== null &&
      `identity` in value &&
      `isBudValue` in value &&
      value.isBudValue
    )
  }

  /**
   * Get {@link Value.identity}
   */
  public static get<T>(value: Value<T> | T): T {
    return Value.isValue(value) ? value.identity : (value as T)
  }

  /**
   * Get {@link Value.identity}
   */
  public static call<T, A extends any[]>(
    value: Value<T> | (T & CallableFunction),
    ...args: A
  ): T {
    return Value.isCallable(value)
      ? Value.get(value)(...args)
      : Value.get(value)
  }
}

export default Value
