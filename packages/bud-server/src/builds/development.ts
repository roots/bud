import middleware from '../middleware'
import injectEntrypoints from '../util/injectEntrypoints'
import {format} from 'prettier'
import createDomain from '../util/createDomain'

const development = {
  before: ({bud}) => {
    bud.options.set('webpack.entry', injectEntrypoints(bud))
  },
  after: ({bud, compilerCallback, expressCallback}) => {
    bud.server.use(function (req, res, next) {
      expressCallback(req)

      next()
    })

    middleware.map(ware => bud.server.use(ware(bud)))

    bud.server.listen(
      bud.options.get('webpack.devServer').port,
      bud.options.get('webpack.devServer').host,
    )

    bud.compiler.hooks.done.tap('bud', compilerCallback)

    bud.compiler.hooks.afterEmit.tap('bud-normalize-manifest', () =>
      bud.fs.readJson(bud.dist('manifest.json')).then(assets => {
        bud.fs.outputFile(
          bud.dist('manifest.json'),
          format(
            JSON.stringify(
              Object.entries(assets).reduce(
                (acc, [key, value]) => ({
                  ...(acc ? acc : []),
                  [key]: `${createDomain(bud)}${value}`,
                }),
                {},
              ),
            ),
            {parser: 'json'},
          ),
        )
      }),
    )
  },
}

export {development as default}
