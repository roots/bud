/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.setPath(`@src`, `src`).entry(`app`, [`scripts/app`, `styles/app`])
}
