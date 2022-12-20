import type {Bud} from '@roots/bud'

export const isYarn = (bud: Bud) =>
  bud.context.config?.[`yarn.lock`] ||
  bud.context.manifest?.packageManager?.includes(`yarn`)

export const isNpm = (bud: Bud) =>
  bud.context.config?.[`package-lock.json`] ||
  bud.context.manifest?.packageManager?.includes(`npm`)

export const detectPackageManager = (bud: Bud): `yarn` | `npm` | false =>
  isYarn(bud) ? `yarn` : isNpm(bud) ? `npm` : false
