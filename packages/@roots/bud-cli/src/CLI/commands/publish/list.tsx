import {formatted} from './util'

/**
 * [command] publish list
 */
export const cmd = CLI => ({
  command: `publish:list`,

  describe: `List available publishable files.`,

  handler: () => {
    console.log(formatted)
  },
})
