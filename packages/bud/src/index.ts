import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as builders from './builders'
import * as services from './services'
import {plugins} from './plugins'

import {Bud as Instance} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-typings'

/**
 * Instantiate Bud.
 */
const bud: Bud = new Instance({
  api,
  builders,
  containers,
  plugins,
  services,
}).getInstance()

const {
  args,
  fs: {
    path: {resolve},
  },
} = bud

bud
  .when(
    args.has('mode'),
    ({mode}: Bud) => mode.set(args.get('mode')),
    ({mode}: Bud) => mode.set('none'),
  )
  .when(
    args.has('project'),
    ({projectPath}: Bud) =>
      projectPath(
        resolve(bud.disk.baseDir, args.get('project')),
      ),
    ({projectPath}) => projectPath(process.cwd()),
  )
  .srcPath(args.get('src') ?? 'src')
  .distPath(args.get('dist') ?? 'dist')

  .when(args.has('html'), ({template}: Bud) => template())
  .when(args.has('minify'), ({minify}: Bud) => minify())
  .when(args.has('gzip'), ({gzip}: Bud) => gzip())
  .when(args.has('brotli'), ({brotli}: Bud) => brotli())
  .when(args.has('runtime'), ({runtime}: Bud) => runtime())
  .when(args.has('vendor'), ({vendor}: Bud) => vendor())
  .when(args.has('hash'), ({hash}: Bud) => hash())
  .when(args.has('devtool'), ({devtool}: Bud) =>
    devtool(args.get('devtool') ?? '#@cheap-eval-source-map'),
  )

/**
 * Framework.Bud
 * @type {Bud}
 */
export default bud

/**
 * Bud
 * @type {Bud}
 */
module.exports = bud
