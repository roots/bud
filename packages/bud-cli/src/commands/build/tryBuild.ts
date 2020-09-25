import * as preflight from './preflight'
import bud from '@roots/bud'
import {stat} from 'fs/promises'

export const tryBuild = async (cfgPath: string) => {
  /**
   * Is this even an actual file?
   */
  try {
    await stat(cfgPath)
  } catch (err) {
    console.error(err)
    process.exit()
  }

  /**
   * Fingers crossed, yo.
   */
  try {
    const maybeModule = await import(cfgPath)

    /**
     * If it is a default export from an esm module
     * then we'll invoke it.
     */
    maybeModule?.hasOwnProperty('default') &&
      typeof maybeModule.default == 'function' &&
      preflight.compile(maybeModule.default(bud))

    /**
     * If it is a cjs export we'll call the
     * function that was passed in, bless em.
     */
    maybeModule &&
      typeof maybeModule == 'function' &&
      preflight.compile(maybeModule.default(bud))
  } catch (err) {
    require(cfgPath)
  }
}
