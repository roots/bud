import {yargs} from '@roots/bud-support'
import {join} from 'path'
import {Error} from '../../'

const cwd = process.cwd()

export const aliases: yargs.CommandModule['aliases'] = 'build'
export const describe: yargs.CommandModule['describe'] =
  'Compile source assets.'

export const builder: yargs.CommandModule['builder'] = ({
  example,
}) =>
  example('Build', 'bud build --mode production')
    .hide('help')
    .hide('version')

export const handler: yargs.CommandModule['handler'] = (args: {
  [config: string]: unknown
}): void => {
  const cfgName = ((args.config ??
    'bud.config.js') as unknown) as string

  const cfgPath = join(cwd, cfgName)

  try {
    require(cfgPath)
  } catch (error) {
    Error(error.toString())
    process.exit()
  }
}
