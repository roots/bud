/**
 * Extension to be run in `production` mode
 */
export const production = <Extension extends {new (...args: any[]): any}>(
  constructor: Extension,
) =>
  class extends constructor {
    public declare enabled: boolean

    public constructor(...args: any[]) {
      super(...args)
      this.enabled = this.app.isProduction
    }
  }
