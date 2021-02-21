import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

export const dev = CLI => {
  const command = 'dev'

  const describe = 'Compile in development mode'

  const builder = ({example}) =>
    example('Build', `${CLI.command} dev`)
      .hide('help')
      .hide('version')

  const handler = ({config}: {[key: string]: unknown}): void => {
    try {
      process.env.mode == 'development'

      require(join(
        process.cwd(),
        (config ??
          (`${CLI.command}.config.js` as unknown)) as string,
      ))
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  }

  return {
    command,
    describe,
    builder,
    handler,
  }
}
