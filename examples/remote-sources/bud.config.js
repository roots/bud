/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.entry(`app`, [`scripts/app`, `styles/app`])
  bud.cdn.enable()
}
