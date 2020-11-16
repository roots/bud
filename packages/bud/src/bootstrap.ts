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
  .use([
    [
      'roots-provide-jquery',
      {
        boot: ({provide}) => provide({jquery: '$'}),
      },
    ],
    [
      'roots-args',
      {
        boot: bud => {
          bud.args.has('html') && bud.template()
          bud.args.has('minify') && bud.minify()
          bud.args.has('gzip') && bud.gzip()
          bud.args.has('brotli') && bud.brotli()
          bud.args.has('runtime') && bud.runtime()
          bud.args.has('vendor') && bud.vendor()
          bud.args.has('hash') && bud.hash()
          bud.args.has('devtool') &&
            bud.devtool(
              bud.args.get('devtool') ??
                '#@cheap-eval-source-map',
            )
        },
      },
    ],
    [
      'roots-project-path',
      {
        boot: bud => {
          !bud.args.has('project')
            ? bud.projectPath(process.cwd())
            : bud.projectPath(
                bud.fs.path.resolve(
                  bud.fs.getBase(),
                  bud.args.get('project'),
                ),
              )

          bud
            .srcPath(bud.args.get('src') ?? 'src')
            .distPath(bud.args.get('dist') ?? 'dist')
        },
      },
    ],
  ])
