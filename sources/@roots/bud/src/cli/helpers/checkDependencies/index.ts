import type {Context} from '@roots/bud-framework'

import isString from '@roots/bud-support/isString'
import logger from '@roots/bud-support/logger'

export const checkDependencies = async (context: Context) => {
  const warn = Object.entries({
    ...(context.manifest?.dependencies ?? {}),
    ...(context.manifest?.devDependencies ?? {}),
  })
    .filter(([signifier]) => signifier.startsWith(`@roots/`))
    .map(([_discardedSignifier, version]) => version)
    .reduce((result: boolean | string, version: string) => {
      if (result === true) return result
      if (isString(result) && version !== result) return true
      return version
    })

  !isString(warn) &&
    logger.warn(`Ensure all @roots packages are running the same version`)
}
