/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud.html({template: bud.path('src/index.html')})

  bud.purgecss({
    content: [bud.path('src/*.html')],
    css: [bud.path('src/**/*.css')],
  })
}
