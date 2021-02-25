import {formatted} from './util'
import {Argv} from 'yargs'

export const command = {
  /**
   * Command
   */
  command: `publish:list`,

  /**
   * Describe
   */
  describe: `List available publishable files.`,

  /**
   * Builder
   */
  builder: (yargs: Argv) =>
    yargs.usage('List available templates'),

  /**
   * Handler
   */
  handler: () => {
    console.log('Available templates')
    console.log(formatted)
    console.log('')
  },
}
