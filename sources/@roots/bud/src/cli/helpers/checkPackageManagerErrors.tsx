import type {Bud} from '@roots/bud-framework'
import * as Ink from 'ink'

import {Error} from '../components/Error.js'
import {isLockConflict} from './isLockfileError.js'

export const checkPackageManagerErrors = (bud: Bud): boolean => {
  if (!bud.context.files) return false

  if (isLockConflict(bud)) {
    Ink.render(
      <Error
        name="Package manager conflict"
        message="Both a yarn.lock and package-lock.json file were found. Please remove one of these files."
      />,
    )
    return true
  }

  return false
}
