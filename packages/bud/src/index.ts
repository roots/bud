import {Bud} from './Bud'

import * as containers from './components/containers'
import {extensions} from './components/extensions'
import {items} from './components/items'
import {loaders} from './components/loaders'
import {rules} from './components/rules'

export const bud: Bud = new Bud({
  containers,
  loaders,
  items,
  rules,
  extensions,
})
  .init()
  .pipe([
    ({args, template}) => args.has('html') && template(),
    ({args, gzip}) => args.has('gzip') && gzip(),
    ({args, brotli}) => args.has('brotli') && brotli(),
    ({args, minify}) => args.has('minify') && minify(),
    ({args, runtime}) => args.has('runtime') && runtime(),
    ({args, vendor}) => args.has('vendor') && vendor(),
    ({args, hash}) => args.has('hash') && hash(),
    ({args, features}) =>
      args.has('debug') && features.enable('debug'),
    ({args, fs, projectPath}) =>
      projectPath(
        args.has('project')
          ? fs.path.resolve(fs.getBase(), args.get('project'))
          : fs.getBase(),
      ),
    ({args, srcPath}) => srcPath(args.get('src') ?? 'src'),
    ({args, distPath}) => distPath(args.get('dist') ?? 'dist'),
    ({args, devtool}) =>
      args.has('devtool') &&
      devtool(args.get('devtool') ?? '#@cheap-eval-source-map'),
  ])
