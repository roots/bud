/**
 * Extension to be run in `production` mode
 *
 * @remarks
 * Class decorator.
 *
 * Use for plugins and extensions which are chonky and not strictly
 * required for the application to function (minimizers, etc.)
 *
 * @public
 */
export const production = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    /**
     * Class constructor
     *
     * @public
     */
    public constructor(...args: any[]) {
      super(...args)
    }

    /**
     * `when` callback
     *
     * @returns `true` when mode is `production`
     * @public
     */
    public when() {
      return this.app.isProduction
    }
  }
