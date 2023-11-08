import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', ['app.js', 'app.css'])

  bud.stylelint
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(false)
}
