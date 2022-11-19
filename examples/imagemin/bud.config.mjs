/**
 * @type {(app: import('@roots/bud').Bud) => Promise<unknown>}
 */
export default async app => {
  app
    .entry(`app`, `app.js`)
    .minimize()
    .imagemin.configure(`squoosh`, {
      options: {
        encodeOptions: {
          mozjpeg: {quality: 75},
          oxipng: {quality: 100},
        },
      },
    })
}
