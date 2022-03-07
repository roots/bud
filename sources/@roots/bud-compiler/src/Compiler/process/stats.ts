import {Framework} from '@roots/bud-framework'
import {
  boxen,
  chalk,
  highlight,
  HighlightOptions,
  humanReadable,
  table,
} from '@roots/bud-support'
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

const highlightOpts: HighlightOptions = {
  language: 'json',
  theme: {
    literal: chalk.hex(theme.blue),
    quote: chalk.hex(theme.blue),
    keyword: chalk.hex(theme.blue),
    regexp: chalk.hex(theme.green),
    string: chalk.hex(theme.blue),
    addition: chalk.hex(theme.green),
    deletion: chalk.hex(theme.dim).strikethrough,
    number: chalk.hex(theme.magenta),
  },
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
    columns: [{paddingRight: 0, wrapWord: true}],
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

    const assets = makeTable([
      ['name', '', 'min', 'chunks', 'size'].map(i =>
        chalk.hex(theme.magenta)(i),
      ),
      ['', '', '', '', ''],
      ...compilation.assets.map(asset => [
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
        ),
        chalk.hex(
          asset.info.error
            ? theme.red
            : asset.info.warn
            ? theme.yellow
            : asset.emitted
            ? theme.foregroundColor
            : theme.dim,
        )(asset.name.split('').slice(0, 20).join('')),
        asset.info.minimized
          ? chalk.hex(theme.green)(`minimized`)
          : chalk.hex(theme.dim)(`᠃`),
        chalk.hex(theme.dim)(
          asset.chunkNames.length ? asset.chunkNames.join(` `) : `᠃`,
        ),
        humanReadable.sizeFormatter<string>()(asset.info.size),
      ]),
    ])

    const summary = () => {
      const tableOpts = {
        border: table.getBorderCharacters('void'),
        singleLine: true,
        columnDefault: {
          paddingRight: 2,
          wrapWord: true,
        },
      }
      const compiler = [
        table.table(
          [
            [chalk.hex(theme.dim)(`build mode`), app.mode],
            [chalk.hex(theme.dim)(`build ident`), compilation.hash],
          ],
          tableOpts,
        ),
        app.store.get('features.log')
          ? table.table(
              [
                [
                  chalk.hex(theme.dim)(`cache type`),
                  chalk.hex(theme.green)(`"filesystem"`),
                ],
                [
                  chalk.hex(theme.dim)(`cache ident`),
                  chalk.hex(theme.green)(`"${app.cache.version}"`),
                ],
                [
                  chalk.hex(theme.dim)(`cache dependencies`),
                  highlight(
                    `[${app.cache.buildDependencies.bud
                      .map(
                        d =>
                          `"${d.replace(
                            app.path(`project`).concat(`/`),
                            ``,
                          )}"`,
                      )
                      .join(`, `)}]`,
                    highlightOpts,
                  ),
                ],
              ],
              tableOpts,
            )
          : '',
        app.store.get('features.log')
          ? table.table(
              [
                [
                  chalk.hex(theme.dim)('extensions'),
                  highlight(
                    `[${app.extensions
                      .getValues()
                      .map(p => `"${p.name.toLowerCase()}"`)
                      .join(`, `)}]`,
                    highlightOpts,
                  ),
                ],
              ],
              tableOpts,
            )
          : '',
        app.store.get('features.log')
          ? table.table(
              [
                [
                  chalk.hex(theme.dim)('compiler plugins'),
                  highlight(
                    `[${app.build.config.plugins
                      .map(p => `"${p.constructor.name.toLowerCase()}"`)
                      .join(`, `)}]`,
                    highlightOpts,
                  ),
                ],
              ],
              tableOpts,
            )
          : '',
      ]

      return compiler.join('')
    }

    const assetsBox = boxen(assets, {
      title: chalk.hex(theme.blue)(`Assets`),
      margin: {
        top: 1,
        bottom: 1,
        left: 0,
        right: 0,
      },
      padding: {
        left: 1,
        top: 1,
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
        assetsBox,
        summary(),
      ].filter(Boolean),
    }
  })

  const out = compilers?.map(compiler => compiler.boxes.join(''))
  // eslint-disable-next-line no-console
  console.log(out.join(''))
}
