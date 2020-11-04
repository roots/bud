import chalk from 'chalk'
import {lodash as _} from '@roots/bud-support'
import {Error} from '@roots/bud-cli'

/**
 * User is attempting to configure Tailwind through the Bud API
 * when there is a tailwind config file present in the project dir.
 */
export const errorConfig = (config: string): void => {
  const file = chalk.yellow(config)

  const title = chalk.red.bold(`\nCan't abide.\n`)

  const body = chalk`You are already configuring Tailwind in {red.bold ${file}}\n Either do your configuration in that file or delete it.\n`

  Error(body, title)
}

/**
 * PostCSS inaccessible.
 */
export const errorDependenciesUnmet = ({
  dependencies,
}: {
  dependencies: {[key: string]: string}
}): void => {
  const hasFirstPartyDeps =
    dependencies &&
    _.intersectionWith(
      ['@roots/bud', '@roots/bud-postcss'],
      Object.keys(dependencies),
      _.isEqual,
    )

  !hasFirstPartyDeps &&
    (() => {
      const title = chalk.red.bold('\nDependencies missing\n')
      const body = chalk`{bold \`@roots/bud-postcss\` } can't be located.\n Please install the package. If you feel like it is installed you may want to consider running your package manager's install command again\n`
      Error(body, title)
    })
}
