// @ts-check

import Bud from '@roots/bud'

/**
 * @param {import('@roots/bud').Bud} app
 */
export default async app => {
  await app.extensions.add([`@roots/bud-swc`, `@roots/bud-tailwindcss`])
  await app.extensions.add([`@roots/bud-emotion`])
  app
    .setPath(`@src`, `src`)
    .alias(`@src`, app.path(`@src`))
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
