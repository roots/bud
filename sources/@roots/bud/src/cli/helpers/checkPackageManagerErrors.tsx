import type {Bud} from '@roots/bud-framework'

import {isLockConflict} from './isLockfileError.js'

export const checkPackageManagerErrors = (bud: Bud): boolean => {
  if (!bud.context.files) return false

  if (isLockConflict(bud)) {
    return true
  }

  return false
}
