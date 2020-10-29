import {Bud} from '@roots/bud-framework'

import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as plugins from './plugins'

import {builders} from './builders'
import {services} from './services'

/**
 * Instantiate Bud.
 */
const bud: Framework.Bud = new Bud({
  api,
  builders,
  containers,
  plugins,
  services,
})

bud
  .when(
    bud.args.has('mode'),
    bud => bud.mode.set(bud.args.get('mode')),
    bud => bud.mode.set('none'),
  )
  .when(bud.args.has('html'), bud => bud.template())
  .when(bud.args.has('minify'), bud => bud.minify())
  .when(bud.args.has('gzip'), bud => bud.gzip())
  .when(bud.args.has('brotli'), bud => bud.brotli())
  .when(bud.args.has('runtime'), bud => bud.runtime())
  .when(bud.args.has('vendor'), bud => bud.vendor())
  .when(bud.args.has('hash'), bud => bud.hash())
  .when(bud.args.has('devtool'), bud =>
    bud.devtool(
      bud.args.get('devtool') ?? '#@cheap-eval-source-map',
    ),
  )

bud.disk.set('@roots', {
  baseDir: bud.fs.path.resolve(__dirname, '../../'),
  glob: ['**/*'],
})

bud.disk.set('project', {
  baseDir: process.cwd(),
  glob: ['**/*'],
})

bud.projectPath(
  bud.args.has('project')
    ? bud.fs.path.resolve(
        bud.disk.baseDir,
        bud.args.get('project'),
      )
    : process.cwd(),
)

bud.srcPath(bud.args.has('src') ? bud.args.get('src') : 'src')

bud.distPath(
  bud.args.has('dist') ? bud.args.get('dist') : 'dist',
)

export default bud
module.exports = bud
