// @ts-check

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud =>
  bud
    .setPath(`@src`, `src`)
    .alias(`@src`, bud.path(`@src`))
    .use([`@roots/bud-swc`, `@roots/bud-tailwindcss`])
    .entry(`app`, [`@src/scripts/app`, `@src/styles/app`])
    .copy([[`images`, `images`]])
    .provide({jquery: [`jQuery`, `$`]})
    .watch([bud.path(`@src`, `*.html`), bud.path(`@src`, `images`)])
    .serve(3015)
    .minimize(false)
    .tap(bud => console.log(`foo!`))
    .esm.enable()
