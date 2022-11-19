/**
 * @type {(app: import('@roots/bud').Bud) => Promise<unknown>}
 */
export default async app => {
  app
    .entry(`app`, `app.js`)
    .minimize()
    .encode(`jpg`, {quality: 75})
    .encode(`oxipng`, {quality: 100})
}
