/* eslint-disable react/no-unescaped-entities */
import type {Bud} from '@roots/bud'
import {Renderer} from '@roots/bud-dashboard/renderer'
import React from '@roots/bud-support/react'

import {Error} from '../components/Error.js'
import {isLockConflict, isNoLock} from './isLockfileError.js'

export const checkPackageManagerErrors = (bud: Bud): boolean => {
  if (!bud.context.config) return false

  if (isNoLock(bud)) {
    Renderer.once(
      <Error
        label="Not installed?"
        message="No lockfile was found in your project. Please run an installation."
      />,
    )
    return true
  }

  if (isLockConflict(bud)) {
    Renderer.once(
      <Error
        label="Package manager conflict"
        message="Both a yarn.lock and package-lock.json file were found. Please remove one of these files."
      />,
    )
    return true
  }

  return false
}
