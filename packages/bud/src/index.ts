import {bud} from './bootstrap'
import type {Bud} from './Bud'

bud
  .when(
    bud.args.has('project'),
    ({args, projectPath, fs}) =>
      projectPath(
        fs.path.resolve(fs.getBase(), args.get('project')),
      ),
    ({projectPath}) => projectPath(process.cwd()),
  )
  .srcPath(bud.args.get('src') ?? 'src')
  .distPath(bud.args.get('dist') ?? 'dist')

bud.when(
  bud.args.has('mode'),
  () => bud.mode.set(bud.args.get('mode')),
  () => bud.mode.set('none'),
)

bud.when(bud.args.has('html'), ({template}) => template())
bud.when(bud.args.has('minify'), ({minify}) => minify())
bud.when(bud.args.has('gzip'), ({gzip}) => gzip())
bud.when(bud.args.has('brotli'), ({brotli}) => brotli())
bud.when(bud.args.has('runtime'), ({runtime}) => runtime())
bud.when(bud.args.has('vendor'), ({vendor}) => vendor())
bud.when(bud.args.has('hash'), ({hash}) => hash())
bud.when(bud.args.has('devtool'), ({devtool}) =>
  devtool(bud.args.get('devtool') ?? '#@cheap-eval-source-map'),
)

module.exports = bud

export {bud, Bud}
