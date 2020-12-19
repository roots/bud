import {React, render, fs, yargs} from '@roots/bud-support'
import {join, dirname} from 'path'

import {Error} from '../'
import Publish from '../containers/Publish'

const cwd = process.cwd()

export const aliases: yargs.CommandModule['aliases'] =
  'publish <file>'

export const describe: yargs.CommandModule['describe'] =
  'Publish an included template to your project.'

export const builder: yargs.CommandModule['builder'] = yargs =>
  yargs
    .positional('file', {
      describe: 'template file to publish',
      type: 'string',
      choices: ['template.html', 'bud.config.js'],
    })
    .usage('$0 publish <file>')
    .showHelpOnFail(true)

export const handler: yargs.CommandModule['handler'] = async (args: {
  _: string[]
}): Promise<void> => {
  const selection = args._[1]

  /**
   * Bail early if command isn't proper.
   * Hit the user with an error message so they know what they did wrong
   */
  if (!selection || typeof selection !== 'string') {
    Error(
      `Try \`bud publish --help\` for a list of available templates.`,
      `You must specify a template to publish`,
    )
  }

  const template = join(
    dirname(require.resolve('@roots/bud-support')),
    `../publish/${selection}`,
  )

  const dest = join(cwd, 'publish', selection)

  try {
    await fs.ensureDir(dirname(dest))
    await fs.copyFile(template, dest)

    render(<Publish file={selection} />)
  } catch (err) {
    Error(
      `Are you sure you got the name right? Try \`bud publish --help\` for a list of available templates.`,
      `The requested template can't be published.`,
    )
  }
}
