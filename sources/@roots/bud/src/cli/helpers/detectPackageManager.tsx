import type {Bud} from '@roots/bud-framework'

/**
 * Has lockfile
 */
export const hasLock = (bud: Bud, lockfile: string) =>
  bud.context.config?.[lockfile]

/**
 * Concretely specified
 */
export const isSpecified = (bud: Bud, packageManagerIdent: string) =>
  bud.context.manifest?.packageManager?.includes(packageManagerIdent)

/**
 * NPM specified
 */
/**
 * Seems to be yarn
 */
export const isYarn = (bud: Bud) =>
  hasLock(bud, `yarn.lock`) || isSpecified(bud, `yarn`)

/**
 * Seems to be npm
 */
export const isNpm = (bud: Bud) =>
  hasLock(bud, `package-lock.json`) || isSpecified(bud, `npm`)

/**
 * Ambigrous package manager
 */
export const isAmbiguous = (bud: Bud) =>
  !isSpecified(bud, `yarn`) &&
  !isSpecified(bud, `npm`) &&
  isYarn(bud) &&
  isNpm(bud)

/**
 * Indeterminate package manager
 */
export const isUnknown = (bud: Bud) => !isYarn(bud) && !isNpm(bud)

/**
 * Detect package manager
 */
export const detectPackageManager = (bud: Bud): `yarn` | `npm` | false => {
  if (isUnknown(bud)) {
    bud.warn(
      `Package manager could not be determined. bud.js cli supports yarn and npm.`,
    )
    return false
  }

  if (isAmbiguous(bud)) {
    bud.warn(
      `Package manager is ambiguous. Default package manager is yarn.`,
    )
    return `yarn`
  }

  return isNpm(bud) ? `npm` : `yarn`
}
