import type {Bud} from '@roots/bud-framework'

import isUndefined from '@roots/bud-support/lodash/isUndefined'

export const isLockConflict = (bud: Bud) =>
  !isUndefined(bud.context.files?.[`yarn.lock`]) &&
  !isUndefined(bud.context.files?.[`package-lock.json`])

export const isNoLock = (bud: Bud) =>
  !bud.context.files?.[`yarn.lock`] &&
  !bud.context.files?.[`package-lock.json`] &&
  !bud.context.files?.[`package.json`]?.module?.packageManager

export const lockError = (bud: Bud) => isLockConflict(bud) || isNoLock(bud)
