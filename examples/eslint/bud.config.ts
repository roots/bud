import type {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', 'app.js')

  bud.eslint
    .extends([`@roots/eslint-config`])
    .setRules({'no-console': `error`})
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(true)
}
