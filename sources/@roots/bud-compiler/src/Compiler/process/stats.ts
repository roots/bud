import {Framework} from '@roots/bud-framework'
import {boxen, chalk, humanReadable, table} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

export const theme = {
  foregroundColor: '#eff0eb',
  dim: '#8f908d',
  backgroundColor: '#282a36',
  red: '#ff5c57',
  green: '#5af78e',
  yellow: '#f3f99d',
  blue: '#57c7ff',
  magenta: '#ff6ac1',
  cyan: '#9aedfe',
}

function makeTable(data: Array<Array<string>>): string {
  return table.table(data, {
    border: table.getBorderCharacters('void'),
    singleLine: true,
    columnDefault: {
      alignment: 'left',
      wrapWord: true,
      paddingRight: 2,
      paddingLeft: 0,
    },
  })
}

export function write(
  stats: {toJson: () => StatsCompilation},
  app: Framework,
): void {
  const compilers = stats.toJson().children?.map(compilation => {
    if (!compilation?.entrypoints) return compilation

    const errors = compilation.errors?.map(error => {
      return boxen(`\n${error.message}`, {
        title: `${error.title ?? 'error'}`,
        margin: {
          top: 0,
          bottom: 1,
          left: 0,
          right: 0,
        },
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
        borderColor: theme.red,
      })
    })

    const warnings = compilation.warnings?.map(warning => {
      return boxen(`\n${warning.message}`, {
        title: `${warning.title ?? 'warning'}`,
        margin: {
          top: 0,
          bottom: 1,
          left: 0,
          right: 0,
        },
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
        borderColor: theme.yellow,
      })
    })

    const marker = asset =>
      chalk.hex(
        asset.info.error
          ? theme.red
          : asset.info.warning
          ? theme.yellow
          : asset.emitted
          ? theme.green
          : theme.dim,
      )(
        asset.info.hotModuleReplacement
          ? `🔥`
          : asset.emitted
          ? `✔`
          : asset.info.error
          ? `✘`
          : asset.info.warning
          ? `⚠`
          : `᠃`,
      )
    const name = asset =>
      chalk.hex(
        asset.info?.error
          ? theme.red
          : asset.info?.warn
          ? theme.yellow
          : asset.emitted
          ? theme.foregroundColor
          : theme.dim,
      )(
        asset.info.hotModuleReplacement
          ? (asset.info.sourceFilename ?? asset.name).split(`.`)[0]
          : (asset.info.sourceFilename ?? asset.name)
              .split(``)
              .reverse()
              .slice(0, 20)
              .reverse()
              .join(``),
      )
    const size = asset =>
      chalk.hex(
        asset.info.minimized
          ? theme.green
          : asset.emitted
          ? theme.foregroundColor
          : theme.dim,
      )(humanReadable.sizeFormatter()(asset.info.size))

    const hot = compilation.assets.filter(
      asset =>
        asset.name.endsWith(`.js`) && asset.name.includes(`hot-update`),
    )
    const statics = compilation.assets.filter(
      asset =>
        ![`js`, `css`].includes(asset.name.split('.').pop()) &&
        !asset.name.includes(`hot-update`),
    )
    const assets = compilation.assets.filter(
      asset =>
        asset.name.endsWith(`.css`) ||
        (asset.name.endsWith(`.js`) && !asset.name.includes('hot-update')),
    )
    const assetTable = assets
      ? makeTable([
          ...assets.map(asset => [
            marker(asset),
            chalk.hex(theme.cyan)(
              asset.chunkNames.length ? asset.chunkNames.join(` `) : `᠃`,
            ),
            name(asset),
            size(asset),
          ]),
          ...(hot.length
            ? [
                ['', '', '', ''],
                ...hot.map(asset => [
                  marker(asset),
                  chalk.hex(theme.cyan)(
                    asset.chunkNames.length
                      ? asset.chunkNames.join(` `)
                      : `᠃`,
                  ),
                  name(asset),
                  size(asset),
                ]),
              ]
            : []),
          ...(statics.length
            ? [
                ['', '', '', ''],
                ...statics
                  .map(asset => [
                    marker(asset),
                    chalk.hex(theme.cyan)(asset.name.split('.').pop()),
                    name(asset),
                    size(asset),
                  ])
                  .slice(0, 5),
              ]
            : []),
        ])
      : ``

    const summary = () => {
      const tableOpts = {
        border: table.getBorderCharacters('void'),
        singleLine: true,
        columnDefault: {
          paddingRight: 1,
          wrapWord: true,
        },
      }
      const time = time =>
        humanReadable.durationFormatter({
          allowMultiples: ['s', 'ms'],
        })(time)

      const compiler = [
        table.table(
          [
            [
              chalk.hex(theme.magenta)(`duration`),
              app.mode === 'production'
                ? `${time(app._hrdone + compilation.time)} ${chalk.dim(
                    `(${time(app._hrdone)} + ${time(compilation.time)})`,
                  )}`
                : time(compilation.time),
            ],
          ],
          tableOpts,
        ),
        table.table(
          [
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
          ],
          tableOpts,
        ),

        app.store.get('features.log')
          ? table.table(
              Object.entries(app.build.rules)
                .filter(
                  ([t, value]) => ['js', 'css'].includes(t) && value.use,
                )
                .map(([type, rule]) => [
                  chalk.hex(theme.magenta)(type),
                  [
                    ...rule
                      .getUse()
                      .map(use =>
                        chalk.hex(theme.cyan)(
                          `\`${app.build.items[use]
                            .getLoader()
                            .getSrc()
                            .split('node_modules/')
                            .pop()
                            .split('/')[0]
                            .replace('-loader', '')}\``,
                        ),
                      ),
                  ]
                    .reverse()
                    .join(' > '),
                ]),
              tableOpts,
            )
          : '',

        app.store.get('features.log')
          ? table.table(
              [
                [
                  chalk.hex(theme.magenta)(`cache type`),
                  chalk.hex(theme.foregroundColor)(`filesystem`),
                ],
                [
                  chalk.hex(theme.magenta)(`cache ident`),
                  chalk.hex(theme.foregroundColor)(app.cache.version),
                ],
              ],
              tableOpts,
            )
          : '',

        app.store.get('features.log')
          ? table.table(
              [
                [
                  chalk.hex(theme.magenta)('extensions'),
                  `[${app.extensions
                    .getValues()
                    .map(
                      p =>
                        `${chalk.hex(theme.cyan)(
                          `\`${p.name.toLowerCase()}\``,
                        )}`,
                    )
                    .join(`, `)}]`,
                ],
              ],
              tableOpts,
            )
          : '',
      ]

      return compiler.join('')
    }

    const assetsBox = boxen(assetTable, {
      title: chalk.hex(theme.blue)(`Assets`),
      margin: {
        top: 0,
        bottom: 1,
        left: 0,
        right: 0,
      },
      padding: {
        left: 1,
        top: 2,
        right: 1,
        bottom: 0,
      },
      textAlignment: 'left',
      borderColor: compilation.errorsCount ? theme.red : theme.blue,
    })

    return {
      ...compilation,
      boxes: [
        compilation.errorsCount ? errors.join('\n') : null,
        compilation.warningsCount ? warnings.join('\n') : null,
        compilation.errorsCount ? chalk.dim(assetsBox) : `\n${assetsBox}`,
        summary(),
      ].filter(Boolean),
    }
  })

  const out = compilers?.map(compiler => compiler.boxes.join(''))
  // eslint-disable-next-line no-console
  console.log(out.join(''))
}
