/**
 * Extension to be run in `development` mode
 *
 * @remarks
 * Class decorator
 *
 * @public
 */
export const development = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public when() {
      return this.app.isDevelopment
    }

    public constructor(...args: any[]) {
      super(...args)
    }
  }
