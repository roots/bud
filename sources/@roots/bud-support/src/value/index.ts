interface Value<T> {
  identity: T
  isBudValue: true
}

class Value<T> {
  public static isBudValue: true = true
  /**
   * For type checking
   *
   * @remarks
   * Some functions like _.set() will mutate the class instance.
   * This property is used to check if the instance is a {@link Value}
   * and should work even after mutation.
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
   * Get {@link Value.identity}
   */
  public static call<T, A extends any[]>(
    value: (T & CallableFunction) | Value<T>,
    ...args: A
  ): T {
    return Value.isCallable(value)
      ? Value.get(value)(...args)
      : Value.get(value)
  }

  /**
   * Get {@link Value.identity}
   */
  public static get<T>(value: T | Value<T>): T {
    return Value.isValue(value) ? value.identity : (value as T)
  }

  public static isCallable<T>(
    value: T | Value<T>,
  ): value is T & CallableFunction {
    return Value.typeOf(value) === `function`
  }

  /**
   * Check {@link Value.identity} type
   */
  public static isValue<T>(value: T | Value<T>): value is Value<T> {
    return (
      typeof value === `object` &&
      value !== null &&
      `identity` in value &&
      `isBudValue` in value &&
      value.isBudValue
    )
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
  public static typeOf<T>(value: T | Value<T>): string {
    return Value.isValue(value) ? typeof value.identity : typeof value
  }

  /**
   * Get value of {@link Value.identity}
   */
  public get() {
    return this.identity
  }
}

export default Value
