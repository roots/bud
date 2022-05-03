export const production = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public when() {
      return this.app.isProduction
    }

    public constructor(...args: any[]) {
      super(...args)
    }
  }
