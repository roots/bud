import type {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', 'app.js')

  bud.eslint
    .setFailOnError(true)
    .setFailOnWarning(true)
    .setLintDirtyModulesOnly(bud.isDevelopment)
}
