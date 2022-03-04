import {boxen, chalk, humanReadable, table} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

export const theme = {
  foregroundColor: '#eff0eb',
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
    columnDefault: {
      alignment: 'left',
      paddingLeft: 2,
      paddingRight: 2,
    },
    columns: [
      {alignment: 'left'},
      {alignment: 'left'},
      {alignment: 'left'},
    ],
  })
}

export function write(stats: StatsCompilation): void {
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

    const assets = boxen(
      makeTable([
        [' name', 'hot', 'size'].map(i =>
          chalk.bold.hex(theme.magenta)(i),
        ),
        ...compilation.assets
          ?.filter(({emitted}) => emitted)
          .map(asset => [
            chalk.hex(
              asset.info.error
                ? theme.red
                : asset.info.warn
                ? theme.yellow
                : '#FFFFFF',
            )(` ${asset.name}`),
            asset.info.hotModuleReplacement
              ? chalk.hex(theme.green)('✔')
              : chalk.dim('✘'),
            humanReadable.sizeFormatter<string>()(asset.info.size),
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
        borderColor: theme.blue,
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

  const out = compilers?.map(compiler => compiler.boxes.join(''))
  // eslint-disable-next-line no-console
  console.log(out.join(''))
}
