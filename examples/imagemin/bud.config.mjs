/**
 * @type {(app: import('@roots/bud').Bud) => Promise<unknown>}
 */
export default async app => {
  app.entry(`app`, `app.js`).minimize()
  imagemin.encode(`jpg`, {quality: 75}).encode(`png`, {quality: 100})
}
