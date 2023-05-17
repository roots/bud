/**
 * Extension to be run in `development` mode
 */
export const development = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public enabled: boolean

    public constructor(...args: any[]) {
      super(...args)
      this.enabled = this.app.isDevelopment
    }
  }
