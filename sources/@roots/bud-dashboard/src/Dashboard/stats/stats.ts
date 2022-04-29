import {Bud} from '@roots/bud-framework'
import {StatsCompilation} from 'webpack'

import {make} from './box.factory'
import * as components from './components'
import {theme} from './theme'
import * as webpackMessage from './webpack.message'

export const write = (stats: StatsCompilation, app: Bud) => {
  const appName = app.context.manifest.name ?? app.name

  app.context.stdout.write(
    make(
      `\nbuild finalized`,
      stats?.children
        ?.map((compilation, i) =>
          !compilation?.entrypoints
            ? null
            : [
                ...webpackMessage
                  .mapMessages(compilation.warnings, theme.yellow)
                  .filter(Boolean),
                ...webpackMessage
                  .mapMessages(compilation.errors, theme.red)
                  .filter(Boolean),
                components
                  .report({
                    appName,
                    count: [i + 1, stats?.children?.length ?? 1],
                    context: app.context,
                    compilation,
                  })
                  .join(''),
                ...components.timing(app, compilation),
                ...components.summary(app, compilation),
                ...(app.hooks.filter('feature.log')
                  ? components.framework(app)
                  : []),
              ]
                .filter(Boolean)
                .join(''),
        )
        .filter(Boolean)
        .join(''),
      {
        color:
          stats?.errorsCount > 0
            ? theme.red
            : stats?.warningsCount > 0
            ? theme.yellow
            : theme.green,
      },
    ),
  )
}
