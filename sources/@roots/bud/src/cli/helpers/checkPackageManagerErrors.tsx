import type {Bud} from '@roots/bud-framework'
import React from '@roots/bud-support/react'

import {Error} from '../components/Error.js'
import {isLockConflict} from './isLockfileError.js'

export const checkPackageManagerErrors = (bud: Bud): boolean => {
  if (!bud.context.config) return false

  if (isLockConflict(bud)) {
    bud.dashboard.renderer.once(
      <Error
        label="Package manager conflict"
        message="Both a yarn.lock and package-lock.json file were found. Please remove one of these files."
      />,
    )
    return true
  }

  return false
}
