/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.entry({app: [`app.js`, `app.css`]})
}
