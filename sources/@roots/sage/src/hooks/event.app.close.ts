import {Bud} from '@roots/bud'
import {pathExistsSync, removeSync} from 'fs-extra'

export default async function (app: Bud) {
  const path = app.path('@dist', 'hmr.json')
  pathExistsSync(path) && removeSync(path)
}
