// @ts-check

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud
    .setPath(`@src`, `src`)
    .use([`@roots/bud-postcss`])
    .entry(`app`, [`scripts/app`, `styles/app`])
    .splitChunks(false)
    .minimize(false)
}
