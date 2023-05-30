import type {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', 'app.js')

  bud.eslint
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(true)
    .setOverrideConfig(config => ({
      ...config,
      rules: {
        ...config.rules,
        'no-console': 2,
      },
    }))
}
