import {argv} from 'yargs'

/**
 * Process CLI arguments
 *
 * @returns string[]
 */

export const processArgs = () => {
  const args: string[] = []

  argv.env && args.push('env')
  argv.port && args.push('port')
  argv.host && args.push('host')
  argv.proxyPort && args.push('proxyPort')
  argv.proxyHost && args.push('proxyHost')
  argv.hot && args.push('hot')
  argv.ci && args.push('ci')
  argv.watch && args.push('watch')

  return args.join(' ')
}
