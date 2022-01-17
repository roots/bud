import {Bud} from '@roots/bud'
import {pathExistsSync, removeSync} from 'fs-extra'

export default function (this: Bud) {
  const path = this.path('dist', 'hmr.json')
  pathExistsSync(path) && removeSync(path)
}
