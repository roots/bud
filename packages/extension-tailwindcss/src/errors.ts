import chalk from 'chalk'
import {lodash as _} from '@roots/bud-support'

/**
 * User is attempting to configure Tailwind through the Bud API
 * when there is a tailwind config file present in the project dir.
 */
export const errorConfig = (config: string): void => {
  const file = chalk.yellow(config)

  console.error(chalk.red.bold(`\nCan't abide.\n`))

  console.error(
    chalk`You are already configuring Tailwind in {red.bold ${file}}`,
  )

  console.error(
    'Either do your configuration in that file or delete it.\n',
  )

  process.exit(1)
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
    console.error(chalk.red.bold('\nDependencies missing\n'))

  console.error(
    chalk`{bold \`@roots/bud-postcss\` } can't be located.`,
  )

  console.error(
    "Please install the package. If you feel like it is installed you may want to consider running your package manager's install command again\n",
  )

  process.exit(1)
}
