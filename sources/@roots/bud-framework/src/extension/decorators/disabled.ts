/**
 * Extension disabled by default
 */
export const disabled = <Extension extends {new (...args: any[]): any}>(
  constructor: Extension,
) =>
  class extends constructor {
    public declare enabled: boolean

    public constructor(...args: any[]) {
      super(...args)
      this.enabled = false
    }
  }
