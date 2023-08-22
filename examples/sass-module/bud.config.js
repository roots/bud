import {bud} from '@roots/bud'

await bud.build.make()

console.log(
  bud.build.rules[`sass-module`],
  bud.build.items[`sass-module`],
  bud.build.config.module.rules[1].oneOf.find(rule => rule.test.test(`index.module.scss`)).use
)
