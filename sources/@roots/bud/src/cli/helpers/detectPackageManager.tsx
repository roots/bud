import type {Bud} from '@roots/bud-framework'

export const isYarn = (bud: Bud) =>
  bud.context.files?.[`yarn.lock`] ||
  bud.context.manifest?.packageManager?.includes(`yarn`)

export const isNpm = (bud: Bud) =>
  bud.context.files?.[`package-lock.json`] ||
  bud.context.manifest?.packageManager?.includes(`npm`)

export const isPnpm = (bud: Bud) =>
  bud.context.files?.[`pnpm-lock.yaml`] ||
  bud.context.manifest?.packageManager?.includes(`pnpm`)

export const detectPackageManager = (bud: Bud): `npm` | `yarn` | false =>
  isYarn(bud) ? `yarn` : isNpm(bud) ? `npm` : false
