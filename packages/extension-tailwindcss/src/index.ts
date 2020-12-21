import chalk from 'chalk'
import {Framework} from '@roots/bud-typings'

export * as api from './api'

export const boot = (bud: Framework): void => {
  !bud.build.items.get('postcss') &&
    (() => {
      Error(
        [
          chalk.red.bold('\nDependencies missing\n'),
          chalk`{bold \`@roots/bud-postcss\` } can't be located.\n Please install the package. If you feel like it is installed you may want to consider running your package manager's install command again\n`,
        ].join('\n\n'),
      )
    })()

  bud.build.items.mutate(
    `postcss.options.postcssOptions.plugins`,
    plugins => [
      ...plugins,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('tailwindcss')(
        bud.fs.get('tailwind.config.js') ?? null,
      ),
    ],
  )
}
