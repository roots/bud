import type {Bud} from '@roots/bud'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

export const isLockConflict = (bud: Bud) =>
  !isUndefined(bud.context.config?.[`yarn.lock`]) &&
  !isUndefined(bud.context.config?.[`package-lock.json`])

export const isNoLock = (bud: Bud) =>
  !bud.context.config?.[`yarn.lock`] &&
  !bud.context.config?.[`package-lock.json`] &&
  !bud.context.config?.[`package.json`]?.module?.packageManager

export const lockError = (bud: Bud) => isLockConflict(bud) || isNoLock(bud)
