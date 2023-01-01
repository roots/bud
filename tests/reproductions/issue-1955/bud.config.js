/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.use([`@roots/bud-babel`, `@roots/bud-react`])
  bud.entry({app: ['app.js', 'app.css']})
}
