import Bud from '@roots/bud'
import fs from 'fs-extra'

/**
 * `event.compiler.close` callback
 *
 * @public
 */
export default async function (app: Bud) {
  const path = app.path('@dist', 'hmr.json')
  fs.pathExistsSync(path) && fs.removeSync(path)
}
