import type {Bud} from '../../index.js'

/**
 * Extension to be run in `development` mode
 *
 * @remarks
 * Extension decorator
 */
export const development = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public constructor(...args: any[]) {
      super(...args)
    }

    /**
     * `when` callback
     *
     * @returns `true` when mode is `development`
     * @public
     */
    public when(bud: Bud) {
      return bud.isDevelopment
    }
  }
