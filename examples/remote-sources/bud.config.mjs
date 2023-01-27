// @ts-check

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.use([`@roots/bud-swc`, `@roots/bud-tailwindcss`])

  bud.entry(`app`, [`scripts/app`, `styles/app`])

  bud.cdn.enable()
}
