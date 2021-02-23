import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

export const cmd = CLI => ({
  command: 'build',
  describe: 'Compile assets',
  builder: ({example}) =>
    example('Build', `${CLI.command} build --mode production`)
      .hide('help')
      .hide('version'),

  handler: ({config}) => {
    try {
      require(join(
        process.cwd(),
        (config ??
          (`${CLI.command}.config.js` as unknown)) as string,
      ))
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  },
})
