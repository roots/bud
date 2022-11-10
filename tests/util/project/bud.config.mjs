// @ts-check
/**
 * @param {import('@roots/bud').Bud} app
 */
export default async app => {
  await app.extensions.add([`@roots/bud-swc`, `@roots/bud-tailwindcss`])
  await app.extensions.add([`@roots/bud-emotion`])
  app
    .entry(`app`, [`@src/scripts/app.js`, `@src/styles/app.css`])
    .setPath(`@src`, `src`)
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}, template: `src/index.html`})
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
    .minimize()
    .provide({jquery: [`jQuery`, `$`]})
    .when(app.isProduction, app => app.hash())
}
