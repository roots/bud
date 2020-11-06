import Bud from '@roots/bud-framework'

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
}).getInstance()

bud
  .when(
    bud.args.has('mode'),
    (bud: Framework.Bud) => bud.mode.set(bud.args.get('mode')),
    (bud: Framework.Bud) => bud.mode.set('none'),
  )
  .when(bud.args.has('devtool'), (bud: Framework.Bud) =>
    bud.devtool(
      bud.args.get('devtool') ?? '#@cheap-eval-source-map',
    ),
  )
  .when(bud.args.has('html'), (bud: Framework.Bud) =>
    bud.template(),
  )
  .when(bud.args.has('minify'), (bud: Framework.Bud) =>
    bud.minify(),
  )
  .when(bud.args.has('gzip'), (bud: Framework.Bud) => bud.gzip())
  .when(bud.args.has('brotli'), (bud: Framework.Bud) =>
    bud.brotli(),
  )
  .when(bud.args.has('runtime'), (bud: Framework.Bud) =>
    bud.runtime(),
  )
  .when(bud.args.has('vendor'), (bud: Framework.Bud) =>
    bud.vendor(),
  )
  .when(bud.args.has('hash'), (bud: Framework.Bud) => bud.hash())

bud.projectPath(
  bud.args.has('project')
    ? bud.fs.path.resolve(
        bud.disk.baseDir,
        bud.args.get('project'),
      )
    : process.cwd(),
)

bud.srcPath(bud.args.has('src') ? bud.args.get('src') : 'src')

bud.build.config.set(
  'output.path',
  bud.args.has('dist')
    ? bud.args.get('dist')
    : bud.fs.path.resolve(process.cwd(), 'dist'),
)

/**
 * Bud
 * @type {Framework.Bud}
 */
export default bud

/**
 * Bud
 * @type {Framework.Bud}
 */
module.exports = bud
