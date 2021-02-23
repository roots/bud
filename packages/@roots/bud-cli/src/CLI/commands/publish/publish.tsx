import {React, render, fs, lodash} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'

/**
 * [command] publish
 */
export const cmd = CLI => ({
  command: 'publish',

  describe: `Publish a template to your project.`,

  builder: yargs =>
    yargs
      .positional('file', {
        describe: 'template file to publish',
        type: 'string',
      })
      .usage('$0 publish <file>'),

  handler: (args: {_: (string | number)[]}): void => {
    ;(async () => {
      const extension: string = lodash.isNumber(args._[1])
        ? args._[1].toString()
        : args._[1]

      const template: string = lodash.isNumber(args._[2])
        ? args._[2].toString()
        : args._[2]

      const destination: string = args._[3]
        ? lodash.isNumber(args._[3])
          ? args._[3].toString()
          : args._[3]
        : null

      /**
       * Bail early if command isn't proper.
       *
       * Hit the user with an error message
       * so they know what they did wrong
       */
      if (!extension || typeof extension !== 'string') {
        Error(
          `Try \`${CLI.command} publish:list\` for a list of available files.`,
          `You must specify a template to publish`,
        )
      }

      const src = `${CLI.cwd}/node_modules/${extension}/publish/${template}`
      const dest = join(
        CLI.cwd,
        `${destination ?? `publish/${template}`}`,
      )

      try {
        await fs.ensureDir(dirname(dest))
        await fs.copyFile(src, dest)

        render(<Publish file={template} />)
      } catch (err) {
        console.log(err)

        Error(
          `Are you sure you got the name right? Try \`${CLI.command} publish:list\` for a list of available files.`,
          `The requested template can't be published.`,
        )
      }
    })()
  },
})
