/**
 * @type {(app: import('@roots/bud').Bud) => Promise<unknown>}
 */
export default async app => {
  app.entry(`app`, `app.js`)
  app.imagemin.encode(`jpeg`, {quality: 75}).encode(`png`, {quality: 100})
}
