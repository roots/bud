import type {Bud} from '@roots/bud'
import {isUndefined} from '@roots/bud-support/lodash-es'

export const isPackageManagerConflict = (bud: Bud) =>
  !isUndefined(bud.context.config?.[`yarn.lock`]) &&
  !isUndefined(bud.context.config?.[`package-lock.json`])

export const isNoPackageManager = (bud: Bud) =>
  !bud.context.config?.[`yarn.lock`] &&
  !bud.context.config?.[`package-lock.json`]

export const isPackageManagerError = (bud: Bud) =>
  isPackageManagerConflict(bud) || isNoPackageManager(bud)
