/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import lodash from 'lodash-es'
import type {StatsCompilation} from 'webpack'

import {theme} from '../theme.js'
import * as assets from './assets.js'
import * as box from './components/box.factory.js'
import * as table from './components/table.factory.js'

export const report = ({
  app,
  count,
  compilation,
}: {
  app: Bud
  count: [number, number]
  compilation: StatsCompilation
}) => {
  const staticGroup = assets.statics(compilation)
  const staticDisplay = staticGroup.splice(0, 5)

  console.log(
    table.make([
      ...assets.group(assets.assets(compilation)).filter(Boolean),
      ...assets.group(staticDisplay).filter(Boolean),
    ]),
  )

  staticGroup.length &&
    console.log(
      chalk.italic.dim(
        `+ ${staticGroup.length} additional static assets\n\n`,
      ),
    )
}

export const timing = (app: Bud, compilation: StatsCompilation) => {
  console.log(
    table.make([
      [
        chalk.hex(theme.magenta)(`duration`),
        app.mode === 'production'
          ? `${assets.time(app._hrdone + compilation.time)} ${chalk.dim(
              `(${assets.time(app._hrdone)} + ${assets.time(
                compilation.time,
              )})`,
            )}`
          : assets.time(compilation.time),
      ],
    ]),
  )
}

export const summary = (app: Bud, compilation: StatsCompilation) => {
  timing(app, compilation)

  console.log(
    table.make([
      [
        chalk.hex(theme.magenta)(`mode`),
        chalk.hex(theme.foregroundColor)(app.mode),
        chalk.hex(theme.magenta)(`hash`),
        chalk.hex(theme.foregroundColor)(compilation.hash),
      ],
      [
        chalk.hex(theme.magenta)(app.context.application.name),
        chalk.hex(theme.foregroundColor)(app.context.application.version),
        chalk.hex(theme.magenta)('webpack'),
        chalk.hex(theme.foregroundColor)(compilation.version),
      ],
      [
        chalk.hex(theme.magenta)('node'),
        chalk.hex(theme.foregroundColor)(process.versions.node),
        '',
        '',
      ],
    ]),
  )

  app.isDevelopment &&
    console.log(
      table.make(
        [
          [
            chalk.hex(theme.magenta)(`server url:`),
            app.server.connection.url.toString(),
          ],
          app.hooks.filter('dev.middleware.enabled').includes('proxy')
            ? [
                chalk.hex(theme.magenta)('proxy url:'),
                app.hooks.filter('dev.middleware.proxy.target').toString(),
              ]
            : null,
        ].filter(Boolean),
      ),
    )
}

export const framework = (app: Bud) => [
  box.make(
    'rules',
    table.make(
      Object.entries(app.build.rules).map(([type, rule]) => [
        chalk.hex(theme.magenta)(type),
        [...rule.getUse()?.map(use => chalk.hex(theme.cyan)(`\`${use}\``))]
          .reverse()
          .join(', '),
      ]),
    ),
  ),
  box.make(
    'cache',
    table.make([
      [
        chalk.hex(theme.magenta)(`type`),
        chalk.hex(theme.foregroundColor)(`filesystem`),
      ],
      [
        chalk.hex(theme.magenta)(`ident`),
        chalk.hex(theme.foregroundColor)(app.cache.version),
      ],
    ]),
  ),
  box.make(
    'extensions',
    table.make(
      lodash
        .chunk(Object.values(app.extensions.repository), 2)
        .map(chunk =>
          [
            ...chunk.map(
              extension =>
                `${chalk.hex(theme.cyan)(
                  `\`${extension.label?.toLowerCase()}\``,
                )}`,
            ),
            ...Array(1).fill(``),
          ].slice(0, 2),
        ),
    ),
  ),
]
