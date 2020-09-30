import * as preflight from './preflight'
import {fs} from '@roots/bud-support'

export const tryBuild = async (
  cfgPath: string,
): Promise<void> => {
  /**
   * Is this even an actual file?
   */
  try {
    fs.statSync(cfgPath)
  } catch (err) {
    console.error(err)
    process.exit()
  }

  /**
   * Fingers crossed, yo.
   */
  import(cfgPath)
    .then(cfg => {
      /**
       * If it is a default export from an esm module
       * then we'll invoke it.
       */
      cfg?.hasOwnProperty('default') &&
        typeof cfg.default == 'function' &&
        preflight.compile()

      /**
       * If it is a cjs export we'll call the
       * function that was passed in, bless em.
       */
      cfg && typeof cfg == 'function' && preflight.compile()
    })
    .catch(err => {
      require(cfgPath)
    })
}
