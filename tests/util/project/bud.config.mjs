/**
 * @param {import('@roots/bud').Bud} app
 */
export default async app => {
  app
    .entry(`app`, [`@src/scripts/app.js`, `@src/styles/app.css`])
    .setPath(`@src`, `src`)
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}, template: `src/index.html`})
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
    .minimize()
    .when(app.isProduction, () => app.hash())
}
