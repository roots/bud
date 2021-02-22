import {formatted} from './util'

/**
 * [command] publish list
 */
export default function (CLI) {
  const command = `publish:list`

  const describe = `List available publishable files.`

  const builder = yargs =>
    yargs.usage(`${CLI.command} publish:list`)

  const handler = (): void => {
    console.log(formatted)
  }

  return {
    command,
    describe,
    builder,
    handler,
  }
}
