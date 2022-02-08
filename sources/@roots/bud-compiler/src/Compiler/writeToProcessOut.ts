import {Framework} from '@roots/bud-framework'
import {boxen, chalk, humanReadable, table} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

function makeTable(data: Array<Array<string>>): string {
  return table.table(data, {
    border: table.getBorderCharacters('void'),
    columnDefault: {
      alignment: 'left',
      paddingLeft: 0,
      paddingRight: 4,
    },
    columns: [
      {alignment: 'left'},
      {alignment: 'center'},
      {alignment: 'center'},
      {alignment: 'center'},
    ],
  })
}

export function writeToProcessOut(
  stats: StatsCompilation,
  colors: Framework['store']['repository']['theme']['colors'],
): void {
  const compilers = stats.children?.map(compilation => {
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
        borderColor: colors.error,
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
        borderColor: colors.warning,
      })
    })

    const assets = boxen(
      makeTable([
        [' name', 'emit', 'cache', 'hot', 'size'].map(i =>
          chalk.hex(colors.flavor)(i),
        ),
        ...compilation.assets.map(asset => [
          ` ${asset.name}`,
          asset.emitted ? '✔' : '✘',
          asset.cached ? '✔' : '✘',
          asset.info.hotModuleReplacement ? '✔' : '✘',
          asset.info.size > 1000
            ? humanReadable.sizeFormatter<string>()(asset.info.size)
            : `.${asset.info.size}`,
        ]),
      ]),
      {
        title: `assets`,
        margin: {
          top: 1,
          bottom: 1,
          left: 0,
          right: 0,
        },
        padding: {
          left: 0,
          top: 1,
          right: 0,
          bottom: 0,
        },
        borderColor: colors.accent,
      },
    )

    return {
      ...compilation,
      boxes: [
        compilation.errorsCount ? errors.join('\n') : null,
        compilation.warningsCount ? warnings.join('\n') : null,
        compilation.assets.filter(({emitted}) => emitted).length
          ? assets
          : null,
      ].filter(Boolean),
    }
  })

  const out = compilers.map(compiler => compiler.boxes.join(''))
  // eslint-disable-next-line no-console
  console.log(out.join(''))
}
