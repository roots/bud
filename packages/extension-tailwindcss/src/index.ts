import {Bud} from '@roots/bud'
import chalk from 'chalk'
import {FileContainer} from '@roots/bud-typings'

export * from './types'

export * as api from './api'

export const boot = (bud: Bud): void => {
  if (
    !require.resolve('tailwindcss') ||
    !bud.build.get('items.postcss')
  ) {
    Error(
      [
        chalk.red.bold('\nDependencies missing\n'),
        chalk`{bold \`@roots/bud-postcss\` } can't be located.\n Please install the package. If you feel like it is installed you may want to consider running your package manager's install command again\n`,
      ].join('\n\n'),
    )

    return
  }

  bud.postcss.addPlugin(
    require('tailwindcss'),
    bud.disk
      .get<FileContainer>('project')
      .get('tailwind.config.js') ?? null,
  )
}
