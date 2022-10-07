/**
 * @param {import('@roots/bud').Bud} app
 */
export default async app => {
  app
    .setPath(`@src`, `src`)
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}, template: `src/index.html`})
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
    .minimize()
}
