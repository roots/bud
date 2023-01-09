/**
 * Extension disabled by default
 *
 * @remarks
 * Class decorator.
 *
 * Use for plugins and extensions which are chonky and not strictly
 * required for the application to function (minimizers, etc.)
 */
export const disabled = <Extension extends {new (...args: any[]): any}>(
  constructor: Extension,
) =>
  class extends constructor {
    public declare enabled: boolean

    /**
     * Class constructor
     *
     * @public
     */
    public constructor(...args: any[]) {
      super(...args)
      this.enabled = false
    }
  }
