import type {Bud} from '@roots/bud-framework'

import type {ApplicationURL} from '../url.js'

const factory = (app: Bud, url: ApplicationURL) => (path: string) => {
  const rewrite = path.replace(
    encodeURI(url.proxy.host),
    encodeURI(url.dev.host),
  )

  if (rewrite !== path) {
    app.log(`Proxy path rewrite`, path, `=>`, rewrite)
  }

  return rewrite
}

export {factory}
