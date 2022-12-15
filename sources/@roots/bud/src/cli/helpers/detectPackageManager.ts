import type {Bud} from '@roots/bud'
import {isUndefined} from '@roots/bud-support/lodash-es'

export const detectPackageManager = (bud: Bud) =>
  !isUndefined(bud.context.config[`yarn.lock`]) ||
  bud.context.manifest?.packageManager?.includes(`yarn`)
    ? `yarn`
    : !isUndefined(bud.context.config[`package-lock.lock`]) ||
      bud.context.manifest?.packageManager?.includes(`npm`)
    ? `npm`
    : false
