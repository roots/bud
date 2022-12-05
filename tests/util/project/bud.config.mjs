// @ts-check

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  await bud.extensions.add([`@roots/bud-swc`, `@roots/bud-tailwindcss`])

  bud
    .setPath(`@src`, `src`)
    .alias(`@src`, bud.path(`@src`))
    .entry(`app`, [`@src/scripts/app`, `@src/styles/app`])
    .copy([[`images`, `images`]])
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
    .proxy(`https://roots2022.test`, {})
    .minimize()
    .provide({jquery: [`jQuery`, `$`]})
}
