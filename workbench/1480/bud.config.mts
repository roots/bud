import '@roots/bud-typescript'

import type Bud from '@roots/bud'

export default async (app: Bud) => {
  app
    .entry({app: ['**/app.{ts,css}']})
    .copy([app.path('@src/images/')])
    .template({template: app.path('@src/index.html')})
    .watch(await app.glob('@src/*.html'))
    .typescript.typecheck.enable()
}
