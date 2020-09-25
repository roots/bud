import React from 'react'
import {render} from 'ink'
import Publish from '../containers/Publish'
import {join, dirname} from 'path'
import {copyFile, ensureDir} from 'fs-extra'
import {assert} from 'console'

import {yargs} from '@roots/bud-support'

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
  assert(typeof selection == 'string')

  const template = join(
    dirname(require.resolve('@roots/bud-support')),
    `../publish/${selection}`,
  )

  const dest = join(cwd, 'publish', selection)

  try {
    await ensureDir(dirname(dest))
    await copyFile(template, dest)

    render(<Publish file={selection} />)
  } catch (err) {
    console.error(err)
  }
}
