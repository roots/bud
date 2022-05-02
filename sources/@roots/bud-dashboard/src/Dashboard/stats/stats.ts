import {Bud} from '@roots/bud-framework'
import {chalk, figures} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

import * as components from './components'
import {theme} from './theme'
import * as webpackMessage from './webpack.message'

export const report = (
  stats: StatsCompilation,
  app: Bud,
): Array<string> => {
  const output = []

  const appName = app.context.manifest.name ?? app.name

  output.push(
    chalk
      .hex(app.compiler.errors.length ? theme.red : theme.green)
      .underline(
        `\n${
          app.compiler.errors.length ? figures.cross : figures.tick
        } ${appName}\n\n`,
      ),
  )

  app.compiler.errors &&
    output.push(...app.compiler.errors.map(webpackMessage.makeError))

  app.compiler.warnings &&
    output.push(...app.compiler.warnings.map(webpackMessage.makeWarning))

  stats?.children?.map((compilation, i) => {
    compilation?.entrypoints &&
      output.push(
        ...components.report({
          appName,
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

  return output.filter(Boolean)
}
