import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

export default CLI => {
  const command = 'build'

  const describe = 'Compile assets'

  const builder = ({example}) =>
    example('Build', `${CLI.command} build --mode production`)
      .hide('help')
      .hide('version')
      .usage(`${CLI.command} ${command} --mode production`)

  const handler = ({config}) => {
    try {
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
