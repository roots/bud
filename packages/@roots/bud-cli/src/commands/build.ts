import {Error} from '@roots/bud-dashboard'
import Command from '../Command'

/**
 * Publish
 */
export default class Build extends Command {
  public name = `build`

  public signature = '<mode>'

  public description =
    'Compile assets and/or initialize development server'

  public arguments = {
    mode: '[choices: "development" or "production"]',
  }

  public options = {
    ['location.src']: {
      flags: '--location.src',
      description: 'Source assets location',
      default: 'src',
      optional: true,
    },
    ['location.dist']: {
      flags: '--location.dist',
      description: 'Compiled assets location',
      default: 'dist',
      optional: true,
    },
    ['location.storage']: {
      flags: '--location.storage',
      description: 'Build artifacts/cache location',
      default: '.bud',
      optional: true,
    },
    ['location.modules']: {
      flags: '--location.modules',
      description: 'node_modules location',
      default: 'node_modules',
      optional: true,
    },
    ['cache']: {
      flags: '--cache',
      description: 'Disable the Bud dashboard',
      default: false,
      optional: true,
    },
    ['ci']: {
      flags: '--ci',
      description: 'Disable the Bud dashboard',
      default: false,
      optional: true,
    },
    debug: {
      flags: '--debug',
      description: 'Enable debug mode',
      default: false,
      optional: true,
    },
    clean: {
      flags: '--clean',
      description: 'Clean stale assets from dist',
      default: true,

      optional: true,
    },
    devtool: {
      flags: '--devtool',
      description: 'Enable sourcemaps',
      default: false,
      optional: true,
    },
    install: {
      flags: '--install',
      description: 'Install missing modules',
      default: false,
      optional: true,
    },
    log: {
      flags: '--log',
      description:
        'Enable logging output. Pass a string to log to a file.',
      default: false,
      optional: true,
    },
    manifest: {
      flags: '--manifest',
      description: 'Produce a manifest.json',
      default: true,
      optional: true,
    },
    minify: {
      flags: '--minify',
      description: 'Enable minification',
      default: false,
      optional: true,
    },
    runtime: {
      flags: '--runtime',
      description: 'Enable code splitting',
      default: false,
      optional: true,
    },
    vendor: {
      flags: '--vendor',
      description: 'Produce a vendor bundle',
      default: false,
      optional: true,
    },
  }

  public action() {
    try {
      this.cli.config.run()
    } catch (error) {
      console.log(error)

      Error(error.toString(), `Error`)
    }
  }
}
