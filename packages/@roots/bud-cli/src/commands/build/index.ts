import {Error} from '@roots/bud-dashboard'
import * as source from './source'

export const command = {
  command: '$0 build <mode>',
  describe:
    'Compile assets and/or initialize development server',
  builder: yargs =>
    yargs
      .example('$0 build', 'Compile assets')
      .example(
        '$0 build development',
        'Compile assets for development',
      )
      .positional('mode', {
        default: 'production',
        describe: 'Compilation mode',
        choices: ['development', 'production'],
        required: true,
      })
      .options({
        src: {
          describe: 'Src directory',
          default: 'src',
          type: 'string',
          group: 'Locations:',
        },
        dist: {
          describe: 'Dist directory',
          default: 'dist',
          type: 'string',
          group: 'Locations:',
        },
        storage: {
          describe: 'Storage directory',
          default: 'storage',
          type: 'string',
          group: 'Locations:',
        },
        records: {
          describe: 'Build artifact for caching',
          default: 'records',
          type: 'string',
          group: 'Locations:',
        },
        node_modules: {
          alias: 'modules',
          describe: 'Node modules directory',
          default: 'node_modules',
          type: 'string',
          group: 'Locations:',
        },
        publicPath: {
          alias: 'public',
          describe: 'Public path',
          default: '/',
          type: 'string',
          group: 'Locations:',
        },
        cache: {
          describe: 'Cache built modules',
          default: true,
          type: 'boolean',
          group: 'Features:',
        },
        ci: {
          describe:
            'CI mode: run build without the bud dashboard',
          default: false,
          type: 'boolean',
          group: 'Build:',
        },
        debug: {
          describe:
            'Enable debug mode. Enables logger and generates a webpack config artifact (saved to `storage`)',
          default: false,
          type: 'boolean',
          group: 'Build:',
        },
        clean: {
          describe: 'Clean stale assets from build dir',
          default: true,
          type: 'boolean',
          group: 'Build:',
        },
        devtool: {
          alias: 'sourcemap',
          describe: 'Specify sourcemap strategy',
          default: 'none',
          type: 'string',
          group: 'Features:',
        },
        log: {
          describe: "Display bud's logging output",
          default: false,
          type: 'boolean',
          group: 'Build:',
        },
        manifest: {
          describe: 'Generate a webpack manifest.json',
          default: true,
          type: 'boolean',
          group: 'Features:',
        },
        minify: {
          describe: 'Minify compiled assets',
          default: false,
          type: 'boolean',
          group: 'Optimize:',
        },
        runtime: {
          describe: 'Generate a runtime entry',
          default: false,
          type: 'boolean',
          group: 'Optimize:',
        },
        vendor: {
          describe:
            'Bundle modules separately from application code',
          default: false,
          type: 'boolean',
          group: 'Optimize:',
        },
      }),
  handler: () => {
    try {
      source.preflight()
      source.isStatic() ? source.json() : source.api()
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  },
}
