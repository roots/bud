import {pathExistsSync, removeSync} from 'fs-extra'

export default app => () => {
  const path = app.path('dist', 'hmr.json')

  pathExistsSync(path) && removeSync(path)
}
