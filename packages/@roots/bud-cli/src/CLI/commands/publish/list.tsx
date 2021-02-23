import {formatted} from './util'

/**
 * [command] publish list
 */
export const cmd = CLI => ({
  command: `publish:list`,

  describe: `List available publishable files.`,

  builder: ({usage}) => usage(`${CLI.command} publish:list`),

  handler: (): void => {
    console.log(formatted)
  },
})
