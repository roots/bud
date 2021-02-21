import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

const command = 'production'

const describe = 'Compile in production mode'

export const production = CLI => {
  const builder = ({example}) =>
    example('Build [production]', `${CLI.command} production`)
      .hide('help')
      .hide('version')

  const handler = ({config}: {[key: string]: unknown}): void => {
    try {
      process.env.mode == 'production'

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
