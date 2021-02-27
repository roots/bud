import {Error} from '@roots/bud-dashboard'
import {Command} from '@roots/bud-cli'
import * as source from '../source'

/**
 * Publish
 */
export default class Build extends Command {
  public name = 'build'

  public signature = '<mode>'

  public description =
    'Compile assets and/or initialize development server'

  public arguments = {
    mode: '"development" or "production"',
  }

  public options = {
    src: {
      description: 'Source assets directory',
      fn: opt => opt.default('src'),
    },
    dist: {
      description: 'Directory to compile to',
    },
    storage: {
      description:
        'Directory to store build artifacts, caches, logs',
    },
    modules: {
      description: 'node_modules directory',
    },
    publicPath: {
      description: 'Public path',
    },
    cache: {
      description: 'Enable caching of compiled modules',
    },
    ci: {
      description: 'Run build without the bud dashboard',
    },
    debug: {
      description:
        'Enable debug mode. Enables logger and generates a webpack config artifact (saved to `storage`)',
    },
    clean: {
      description:
        'Clean stale assets from dist directory during compilation',
    },
    devtool: {
      description: 'Specify a sourcemap implementation',
    },
    log: {
      description: 'Present logger output in terminal',
    },
    manifest: {
      description: 'Generate a manifest.json file',
    },
    minify: {
      description: 'Minify compiled assets',
    },
    runtime: {
      description: 'Enable code splitting',
    },
    vendor: {
      description: 'Separate application and vendor bundles',
    },
  }

  public action() {
    try {
      source.preflight()
      source.isStatic() ? source.json() : source.api()
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  }
}
