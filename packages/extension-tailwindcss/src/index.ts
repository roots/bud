// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')
import chalk from 'chalk'

export const boot = (instance: Framework.Bud): void => {
  const projectConfig = instance.disk
    .get('project')
    .get('tailwind.config.js')

  projectConfig &&
    instance.css.addPlugin([
      tailwindcss({
        config: instance.disk
          .get('project')
          .get('tailwind.config.js'),
      }),
    ])

  Object.assign(instance, {
    tailwind: function (
      this: Framework.Bud,
      config: unknown,
    ): Framework.Bud {
      projectConfig &&
        (() => {
          console.error(
            chalk.red(
              `Can't abide. You are already configuring Tailwind in  ${chalk.yellow(
                projectConfig,
              )}. Either do your configuration in that file or delete it.`,
            ),
          )
          process.exit(1)
        })()

      instance.css.addPlugin([
        tailwindcss({
          config,
        }),
      ])

      return this
    },
  })
}
