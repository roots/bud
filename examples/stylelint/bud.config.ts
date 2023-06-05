import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', ['app.js', 'app.css'])

  bud.stylelint
    .extends([`@roots/bud-stylelint/config`])
    .setRules({'no-descending-specificity': null})
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(true)
}
