import {Bud} from '@roots/bud-framework'
import {chalk, figures, humanReadable, lodash} from '@roots/bud-support'
import {StatsAsset, StatsCompilation} from 'webpack'

import * as box from './box.factory'
import * as table from './table.factory'
import {theme} from './theme'

const assetColor = (asset: StatsAsset) =>
  asset.info.error
    ? theme.red
    : asset.info.warning
    ? theme.yellow
    : asset.emitted
    ? theme.green
    : theme.dim

const assetIcon = (asset: StatsAsset) =>
  asset.info.minimized && asset.emitted
    ? figures.circleFilled
    : asset.emitted
    ? figures.circle
    : asset.info.error
    ? figures.cross
    : asset.info.warning
    ? figures.warning
    : figures.circleDotted

export const status = (asset: StatsAsset) =>
  chalk.hex(assetColor(asset))(assetIcon(asset))

export const name = (asset: StatsAsset) =>
  chalk.hex(!asset.emitted ? theme.dim : theme.foregroundColor)(
    asset.info.hotModuleReplacement
      ? asset.name.split(`.`)[0]
      : asset.name,
  )

export const chunk = (asset: StatsAsset) =>
  chalk.hex(assetColor(asset))(
    asset.chunkNames.length ? asset.chunkNames.join(` `) : `᠃`,
  )

export const size = (asset: StatsAsset) =>
  chalk.hex(theme.dim)(humanReadable.sizeFormatter()(asset.info.size))

export const hot = (compilation: StatsCompilation) =>
  compilation.assets.filter(
    asset =>
      asset.name.endsWith(`.js`) && asset.name?.includes(`hot-update`),
  ) ?? []

export const statics = (compilation: StatsCompilation) => {
  const list = compilation.assets.filter(
    asset =>
      ![`js`, `css`].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  )

  return list
}

export const assets = (compilation: StatsCompilation) =>
  compilation.assets.filter(
    asset =>
      asset.name?.endsWith(`.css`) ||
      (asset.name?.endsWith(`.js`) && !asset.name?.includes('hot-update')),
  ) ?? []

export const time = (time: StatsAsset['time'] & string) =>
  humanReadable.durationFormatter({
    allowMultiples: ['s', 'ms'],
  })(time)

export const assetGroup = (assets: StatsCompilation['assets']) =>
  assets?.length
    ? assets.map(asset => [status(asset), name(asset), size(asset)])
    : []

export const report = ({
  appName,
  count,
  context,
  compilation,
}: {
  appName: string
  count: [number, number]
  context: Bud['context']
  compilation: StatsCompilation
}) => {
  const assetTable = table.make(
    assetGroup(assets(compilation)).filter(Boolean),
  )

  const staticGroup = statics(compilation)
  const staticDisplay = staticGroup.splice(0, 5)
  const staticTable = table.make(assetGroup(staticDisplay).filter(Boolean))

  return [
    box.make(
      `[${count[0]}/${count[1]}] ${compilation.outputPath.replace(
        context.projectDir,
        '.',
      )}`,
      [
        assetTable,
        staticDisplay?.length
          ? staticGroup.length
            ? [
                staticTable,
                chalk.italic.dim(
                  `+ ${staticGroup.length} additional static assets\n`,
                ),
              ].join('')
            : staticTable
          : null,
      ]
        .filter(Boolean)
        .join(''),
    ),
  ]
}

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
    [
      chalk.hex(theme.magenta)('node'),
      chalk.hex(theme.foregroundColor)(process.versions.node),
      '',
      '',
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
