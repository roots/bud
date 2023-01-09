/**
 * Extension to be run in `production` mode
 *
 * @remarks
 * Class decorator.
 *
 * Use for plugins and extensions which are chonky and not strictly
 * required for the application to function (minimizers, etc.)
 */
export const production = <Extension extends {new (...args: any[]): any}>(
  constructor: Extension,
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
    public when({isProduction}) {
      return isProduction
    }
  }
