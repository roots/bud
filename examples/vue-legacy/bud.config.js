/** @param {import('@roots/bud').Bud} app */
export default async app =>
  app.html({template: app.path('@src/index.html')})
