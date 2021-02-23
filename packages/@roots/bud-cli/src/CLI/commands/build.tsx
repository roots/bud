import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

export const command = 'build <mode> [...options]'

export const describe = 'Compile assets'

export const builder = yargs =>
  yargs
    .example('Compile for production', `$0 build production`)
    .example(`Compile for development`, `$0 build development`)
    .positional('mode', {
      default: 'production',
      describe: 'Compilation mode',
      required: true,
      choices: ['development', 'production'],
    })
    .option('config', {
      describe: 'Custom config file location',
      default: `bud.config.js`,
    })
    .option('cache', {
      describe: 'Cache build',
      default: true,
    })
    .option('project', {
      describe: 'Project dir',
      default: 'process.cwd',
    })
    .option('src', {
      describe: 'Src directory',
      default: 'src',
    })
    .option('dist', {
      describe: 'Dist directory',
      default: 'dist',
    })
    .option('pubilcPath', {
      describe: 'Public path',
      default: '/',
    })
    .option('storage', {
      describe: 'Storage directory',
      default: '.bud',
    })
    .options('records', {
      describe: 'Records directory',
      default: 'records',
    })
    .options('modules', {
      describe: '`node_modules` directory',
      default: 'node_modules',
    })

export const handler = argv => {
  try {
    const cfgPath = join(
      process.cwd(),
      (argv.config ?? (`bud.config.js` as unknown)) as string,
    )

    require(cfgPath)
  } catch (error) {
    Error(error.toString(), `Error`)
  }
}
