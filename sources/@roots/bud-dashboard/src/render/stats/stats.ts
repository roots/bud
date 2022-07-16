import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import type {StatsCompilation} from 'webpack'

import * as components from './components.js'
import {theme} from './theme.js'
import * as webpackMessage from './webpack.message.js'

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
  const output = [`\n`]

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
      ].join(``),
    )

    app.hooks.filter(`feature.log`) &&
      output.push(...components.framework(app))
  })

  return output.filter(Boolean).join(``)
}
