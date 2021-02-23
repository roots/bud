import {join} from 'path'
import {Error} from '@roots/bud-dashboard'

export const cmd = CLI => ({
  command: 'build <mode> [...options]',

  describe: 'Compile assets',

  builder: yargs =>
    yargs
      .example(
        'Compile for production',
        `${CLI.command} build production`,
      )
      .example(
        `Compile for development`,
        `${CLI.command} build development`,
      )
      .positional('mode', {
        default: 'production',
        describe: 'Compilation mode',
        required: true,
        choices: ['development', 'production'],
      })
      .option('config', {
        describe: 'Custom config file location',
        default: `${CLI.command}.config.js`,
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
      }),

  handler: argv => {
    try {
      const cfgPath = join(
        process.cwd(),
        (argv.config ??
          (`${CLI.command}.config.js` as unknown)) as string,
      )

      require(cfgPath)
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  },
})
