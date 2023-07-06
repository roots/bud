/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.entry('app', ['app.css']).entry('app2', ['app2.css'])

  bud.html({template: bud.path('public/index.html')})

  bud.critical.set(`src`, app.path(`public/index.html`)).enable()
}
