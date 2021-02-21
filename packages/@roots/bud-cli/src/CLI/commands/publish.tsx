import {
  React,
  render,
  fs,
  lodash,
  globby,
  chalk,
} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'

/**
 * Publishable matches (glob pattern)
 */
const publishables = [
  ...globby
    .sync([
      '**/node_modules/bud-*/publish/*',
      '**/node_modules/*/bud-*/publish/*',
    ])
    .filter(
      (value, index, self) => self.indexOf(value) === index,
    ),
]

/**
 * [command] publish
 */
export const publish = CLI => {
  const command = 'publish'

  /**
   * publish describe
   */
  const describe = `Publish a template to your project.\n${publishables.reduce(
    (a, file) => {
      const ext = dirname(dirname(file)).replace(
        'node_modules/',
        '',
      )

      const template = file
        .replace(`${ext}/publish/`, '')
        .replace('node_modules/', '')

      return `${a} \n${chalk.blue(ext)} ${chalk.green(
        template,
      )}   ${chalk.dim(`bud publish ${ext} ${template}`)}`
    },
    ``,
  )}`

  /**
   * publish command builder
   */
  const builder = yargs =>
    yargs
      .positional('file', {
        describe: 'template file to publish',
        type: 'string',
      })
      .usage('$0 publish <file>')

  /**
   * publish handler
   */
  const handler = (args: {_: (string | number)[]}): void => {
    ;(async () => {
      const extension: string = lodash.isNumber(args._[1])
        ? args._[1].toString()
        : args._[1]

      const template: string = lodash.isNumber(args._[2])
        ? args._[2].toString()
        : args._[2]

      /**
       * Bail early if command isn't proper.
       *
       * Hit the user with an error message
       * so they know what they did wrong
       */
      if (!extension || typeof extension !== 'string') {
        Error(
          `Try \`${CLI.command} publish --help\` for a list of available templates.`,
          `You must specify a template to publish`,
        )
      }

      const src = `${CLI.cwd}/node_modules/${extension}/publish/${template}`
      const dest = join(CLI.cwd, 'publish', `${template}`)

      try {
        await fs.ensureDir(dirname(dest))
        await fs.copyFile(src, dest)

        render(<Publish file={template} />)
      } catch (err) {
        Error(
          `Are you sure you got the name right? Try \`${CLI.command} or ${CLI.command} publish --help\` for a list of available srcFiles.`,
          `The requested template can't be published.`,
        )
      }
    })()
  }

  return {
    command,
    describe,
    builder,
    handler,
  }
}
