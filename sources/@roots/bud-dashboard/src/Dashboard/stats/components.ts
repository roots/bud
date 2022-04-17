import {Bud} from '@roots/bud-framework'
import {chalk, humanReadable, lodash} from '@roots/bud-support'
import {StatsAsset, StatsCompilation} from 'webpack'

import * as box from './box.factory'
import * as table from './table.factory'
import {theme} from './theme'

const assetColor = asset =>
  asset.info.error
    ? theme.red
    : asset.info.warning
    ? theme.yellow
    : asset.emitted
    ? theme.green
    : theme.dim

const assetIcon = asset =>
  asset.info.minimized && asset.emitted
    ? `⚡`
    : asset.info.hotModuleReplacement
    ? `🔥`
    : asset.emitted
    ? `✔`
    : asset.info.error
    ? `✖`
    : asset.info.warning
    ? `⚠`
    : ` `

export const status = (asset: StatsAsset) =>
  chalk.hex(assetColor(asset))(assetIcon(asset))

export const name = asset =>
  chalk.hex(assetColor(asset))(
    asset.info.hotModuleReplacement
      ? (asset.info.sourceFilename ?? asset.name).split(`.`)[0]
      : asset.info.sourceFilename ?? asset.name,
  )

export const chunk = asset =>
  chalk.hex(assetColor(asset))(
    asset.chunkNames.length ? asset.chunkNames.join(` `) : `᠃`,
  )

export const size = asset =>
  chalk.hex(asset.emitted ? theme.foregroundColor : theme.dim)(
    humanReadable.sizeFormatter()(asset.info.size),
  )

export const hot = compilation =>
  compilation.assets.filter(
    asset =>
      asset.name.endsWith(`.js`) && asset.name?.includes(`hot-update`),
  ) ?? []

export const statics = compilation =>
  compilation.assets.filter(
    asset =>
      ![`js`, `css`].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  ) ?? []

export const assets = compilation =>
  compilation.assets.filter(
    asset =>
      asset.name?.endsWith(`.css`) ||
      (asset.name?.endsWith(`.js`) && !asset.name?.includes('hot-update')),
  ) ?? []

export const time = time =>
  humanReadable.durationFormatter({
    allowMultiples: ['s', 'ms'],
  })(time)

export const assetGroup = assets =>
  assets?.length
    ? assets.map(asset => [
        status(asset),
        chunk(asset),
        name(asset),
        size(asset),
      ])
    : []

export const report = (compilation: StatsCompilation) => [
  table.make(
    [
      ...assetGroup(assets(compilation)),
      ...assetGroup(hot(compilation)),
      ...assetGroup(statics(compilation)),
    ].filter(Boolean),
  ),
]

export const timing = (app: Bud, compilation: StatsCompilation) => [
  table.make([
    [
      chalk.hex(theme.magenta)(`duration`),
      app.mode === 'production'
        ? `${time(app._hrdone + compilation.time)} ${chalk.dim(
            `(${time(app._hrdone)} + ${time(compilation.time)})`,
          )}`
        : time(compilation.time),
    ],
  ]),
]

export const summary = (app: Bud, compilation: StatsCompilation) => [
  table.make([
    [
      chalk.hex(theme.magenta)(`mode`),
      chalk.hex(theme.foregroundColor)(app.mode),
      chalk.hex(theme.magenta)(`hash`),
      chalk.hex(theme.foregroundColor)(compilation.hash),
    ],
    [
      chalk.hex(theme.magenta)('bud'),
      chalk.hex(theme.foregroundColor)(
        app.project.get('installed.@roots/bud'),
      ),
      chalk.hex(theme.magenta)('webpack'),
      chalk.hex(theme.foregroundColor)(compilation.version),
    ],
  ]),
  ...(app.isDevelopment
    ? [
        table.make([
          [
            chalk.hex(theme.magenta)(`server url:`),
            app.server.connection.url.toString(),
          ],
          app.hooks.filter('dev.middleware.enabled').includes('proxy')
            ? [
                chalk.hex(theme.magenta)('proxy url:'),
                app.hooks.filter('dev.middleware.proxy.target').toString(),
              ]
            : [``, ``],
        ]),
      ]
    : []),
]

export const development = (app: Bud) => [
  box.make(
    'development',
    table.make([
      [
        chalk.hex(theme.magenta)('server'),
        app.server.connection.url.toString(),
      ],
      app.hooks.filter('dev.middleware.enabled')?.includes('proxy')
        ? [
            chalk.hex(theme.magenta)('proxy'),
            app.hooks.filter('dev.middleware.proxy.target')?.toString(),
          ]
        : ['', ''],
    ]),
  ),
]

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
        .chunk(app.extensions.getValues(), 2)
        .map(chunk =>
          [
            ...chunk.map(
              ({label}) =>
                `${chalk.hex(theme.cyan)(`\`${label?.toLowerCase()}\``)}`,
            ),
            ...Array(1).fill(``),
          ].slice(0, 2),
        ),
    ),
  ),
]
