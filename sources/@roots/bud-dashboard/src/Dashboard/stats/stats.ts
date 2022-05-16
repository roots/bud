import {Bud} from '@roots/bud-framework'
import {chalk, figures} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

import * as components from './components'
import {theme} from './theme'
import * as webpackMessage from './webpack.message'

export const report = ({
  stats,
  warnings,
  errors,
  app,
}: {
  stats: StatsCompilation
  warnings: any
  errors: any
  app: Bud
}): string => {
  const output = []

  errors && output.push(...errors.map(webpackMessage.makeError))
  warnings && output.push(...warnings.map(webpackMessage.makeWarning))

  stats?.children?.map((compilation, i) => {
    if (stats.children.length > 1) {
      output.push(
        chalk
          .hex(errors.length ? theme.red : theme.green)
          .underline(
            `\n${errors.length ? figures.cross : figures.tick} ${
              compilation.name
            }\n\n`,
          ),
      )
    }

    compilation?.entrypoints &&
      output.push(
        ...components.report({
          appName: app.name,
          count: [i + 1, stats?.children?.length ?? 1],
          context: app.context,
          compilation,
        }),
      )

    output.push(
      [
        components.timing(app, compilation),
        ...components.summary(app, compilation),
      ].join(''),
    )

    app.hooks.filter('feature.log') &&
      output.push(...components.framework(app))
  })

  return output.filter(Boolean).join('')
}
