import {yargs} from '@roots/bud-support'
import {Error} from '@roots/bud-dashboard'
import {join} from 'path'

const cwd = process.cwd()

export const describe: Describe = 'Compile source assets.'

export const builder: Builder = ({example}) =>
  example('Build', 'bud build --mode production')
    .hide('help')
    .hide('version')

export const handler: Handler = (args: {
  [config: string]: unknown
}): void => {
  try {
    require(join(
      cwd,
      (args.config ?? ('bud.config.js' as unknown)) as string,
    ))
  } catch (error) {
    Error(error.toString(), `Error`)
  }
}

declare type Builder = yargs.CommandModule['builder'] &
  (({example}) => void)

declare type Describe = yargs.CommandModule['describe']

declare type Handler = yargs.CommandModule['handler'] &
  ((args: {[config: string]: unknown}) => void)
