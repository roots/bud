import {Bud} from '@roots/bud-framework'
import {StatsCompilation} from 'webpack'

import * as box from './box.factory'
import * as components from './components'
import {theme} from './theme'
import * as webpackMessage from './webpack.message'

export const write = (
  stats: {toJson: () => StatsCompilation},
  app: Bud,
) =>
  stats.toJson().children?.map(compilation => {
    if (!compilation?.entrypoints) return compilation

    const output = [
      ...webpackMessage.mapMessages(compilation.warnings, theme.yellow),
      ...webpackMessage.mapMessages(compilation.errors, theme.red),
      box.make('assets', components.report(compilation).join('')),
      ...components.timing(app, compilation),
      ...components.summary(app, compilation),
      ...(app.store.get('features.log') ? components.framework(app) : []),
    ].join('')

    // eslint-disable-next-line
    app.context.stdout.write(`\n${output}\n`)
  })
