// @ts-check
/** @param {import('@roots/bud').Bud} bud */
export default async bud => {
  bud.entrypoints.set(`emitHtml`, true)

  bud
    .setPath(`@src`, `src`)
    .use([`@roots/bud-swc`, `@roots/bud-tailwindcss`])
    .copy([`images`])
    .entry(`app`, [`scripts/app`, `styles/app`])
    .watch([bud.path(`@src`, `*.html`), bud.path(`@src`, `images`)])
    .serve(3015)
    .splitChunks(false)
    .minimize(false)
}
