import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as builders from './builders'
import {disks} from './disks'
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
  disks,
  plugins,
  services,
}).bootstrap()

const {
  args,
  fs: {
    path: {resolve},
  },
} = bud

bud
  .when(
    args.has('project'),
    ({projectPath}: Bud) =>
      projectPath(
        resolve(bud.fs.getBase(), args.get('project')),
      ),
    ({projectPath}) => projectPath(process.cwd()),
  )
  .srcPath(args.get('src') ?? 'src')
  .distPath(args.get('dist') ?? 'dist')

  .when(
    args.has('mode'),
    ({mode}: Bud) => mode.set(args.get('mode')),
    ({mode}: Bud) => mode.set('none'),
  )

  .when(args.has('html'), ({template}) => template())
  .when(args.has('minify'), ({minify}) => minify())
  .when(args.has('gzip'), ({gzip}) => gzip())
  .when(args.has('brotli'), ({brotli}) => brotli())
  .when(args.has('runtime'), ({runtime}) => runtime())
  .when(args.has('vendor'), ({vendor}) => vendor())
  .when(args.has('hash'), ({hash}) => hash())
  .when(args.has('devtool'), ({devtool}) =>
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
