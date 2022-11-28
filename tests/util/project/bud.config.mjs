// @ts-check

import Bud from '@roots/bud'

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  await bud.extensions.add([`@roots/bud-swc`, `@roots/bud-tailwindcss`])
  await bud.extensions.add([`@roots/bud-emotion`])

  bud
    .setPath(`@src`, `src`)
    .alias(`@src`, bud.path(`@src`))
    .entry(`app`, [`@src/scripts/app`, `@src/styles/app`])
    .copy([[`images`, `images`]])
    .template({
      replace: {
        APP_TITLE: `Bud`,
        replaceTest: `replaced`,
      },
      template: `src/index.html`,
    })
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
    .minimize()
    .provide({jquery: [`jQuery`, `$`]})
}
