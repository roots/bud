import {join} from 'path'
import {yargs} from '@roots/bud-support'

const cwd = process.cwd()

export const aliases: yargs.CommandModule['aliases'] = 'build'

export const describe: yargs.CommandModule['describe'] =
  'Build source into compiled assets.'

export const builder: yargs.CommandModule['builder'] = yargs =>
  yargs
    .option('config', {
      describe: 'Specify a custom configuration file',
      default: 'bud.config.js',
    })
    .option('env', {
      describe: 'Specify build mode',
      choices: ['development', 'production', 'none'],
      default: 'none',
    })
    .option('hot', {
      describe: 'Enable HMR',
      type: 'boolean',
      default: false,
    })
    .option('minify', {
      describe: 'Minify assets',
      type: 'boolean',
      default: false,
    })
    .option('gzip', {
      describe: 'Gzip static assets',
      type: 'boolean',
      default: false,
    })
    .option('hash', {
      describe: 'Hash asset filenames',
      type: 'boolean',
      default: false,
    })
    .option('brotli', {
      describe: 'Apply brotli compression to static assets',
      type: 'boolean',
      default: false,
    })
    .option('runtime', {
      describe: 'Generate runtime chunk',
      type: 'boolean',
      default: false,
    })
    .option('vendor', {
      describe: 'Generate vendor chunk',
      type: 'boolean',
      default: false,
    })
    .option('src', {
      describe: 'Override src directory',
      type: 'string',
    })
    .option('dest', {
      describe: 'Override destination directory',
      type: 'string',
    })
    .option('port', {
      describe: 'Dev port',
      type: 'number',
      default: 3000,
    })
    .option('host', {
      describe: 'Dev host',
      type: 'string',
      default: 'localhost',
    })
    .option('proxy', {
      describe: 'Hostname to proxy',
      type: 'string',
    })
    .option('ci', {
      describe: 'Run build in terminal compatibility mode.',
      type: 'boolean',
      default: false,
    })
    .option('html', {
      describe: 'Use an HTML5 boilerplate',
      type: 'boolean',
    })
    .option('log', {
      describe: 'Specify filepath to log to',
      type: 'string',
    })
    .example('Dev', 'bud build --env development --hot')
    .example(
      'Build',
      'bud build --env production --runtime --vendor --minify --gzip',
    )
    .example(
      'CI',
      'bud build --env production --runtime --vendor --minify --gzip --ci',
    )
    .hide('help')
    .hide('version')
    .showHelpOnFail(true)

/**
 * handler: bud build
 */
export const handler: yargs.CommandModule['handler'] = (args: {
  [config: string]: unknown
}): void => {
  const cfg = args.config ?? 'bud.config.js'
  const cfgPath = join(cwd, cfg as string)

  require(cfgPath)
}
