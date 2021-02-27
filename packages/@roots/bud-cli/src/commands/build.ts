import {Error} from '@roots/bud-dashboard'
import Command from '../Command'
import * as source from '../source'

/**
 * Publish
 */
export default class Build extends Command {
  public name = `build`

  public signature: Command['signature'] = '<mode>'

  public description: Command['description'] =
    'Compile assets and/or initialize development server'

  public arguments: Command['arguments'] = {
    mode: '"development" or "production"',
  }

  public options: Command['options'] = {
    src: {
      flags: '--src [src]',
      description: 'Directory to compile from',
      default: 'src',
      optional: true,
    },
    dist: {
      flags: '--dist [dist]',
      description: 'Directory to compile to',
      default: 'dist',
      optional: true,
    },
    storage: {
      flags: '--storage [storage]',
      description:
        'Directory to store build artifacts, caches, logs, etc.',
      default: '.bud',
      optional: true,
    },
    modules: {
      flags: '--modules [modules]',
      description: 'node_modules directory',
      default: 'node_modules',
      optional: true,
    },
    ci: {
      flags: '--ci [ci]',
      description: 'Run without using the Bud dashboard',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    debug: {
      flags: '--debug [debug]',
      description:
        'Enable debug mode. Enables logger and generates a webpack config artifact (saved to `storage`)',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    clean: {
      flags: '--clean [clean]',
      description:
        'Clean stale assets from dist directory during compilation',
      default: true,

      optional: true,
      choices: ['true', 'false'],
    },
    devtool: {
      flags: '--devtool [devtool]',
      description: 'Specify a sourcemap implementation',
      default: false,
      optional: true,
    },
    log: {
      flags: '--log [log]',
      description: 'Present logger outputin the terminal',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    manifest: {
      flags: '--manifest [manifest]',
      description: 'Generate a manifest.json file',
      default: true,

      optional: true,
      choices: ['true', 'false'],
    },
    minify: {
      flags: '--minify [minify]',
      description: 'Minify compiled assets',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    runtime: {
      flags: '--runtime [runtime]',
      description: 'Enable code splitting',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    vendor: {
      flags: '--vendor [vendor]',
      description: 'Separate application and vendor code',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
  }

  public action({mode}) {
    try {
      source.preflight()
      source.isStatic() ? source.json() : source.api()
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  }
}
