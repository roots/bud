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
      flags: '--location.src [src]',
      description: 'Source assets location',
      default: 'src',
      optional: true,
    },
    ['location.dist']: {
      flags: '--location.dist [dist]',
      description: 'Compiled assets location',
      default: 'dist',
      optional: true,
    },
    ['location.storage']: {
      flags: '--location.storage [storage]',
      description: 'Build artifacts/cache location',
      default: '.bud',
      optional: true,
    },
    ['location.modules']: {
      flags: '--location.modules [modules]',
      description: 'node_modules location',
      default: 'node_modules',
      optional: true,
    },
    ['cache']: {
      flags: '--cache [cache]',
      description: 'Disable the Bud dashboard',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    ['ci']: {
      flags: '--ci [ci]',
      description: 'Disable the Bud dashboard',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    debug: {
      flags: '--debug [debug]',
      description: 'Enable debug mode',
      default: false,
      optional: true,
      choices: ['true', 'false'],
    },
    clean: {
      flags: '--clean [clean]',
      description: 'Clean stale assets from dist',
      default: true,

      optional: true,
      choices: ['true', 'false'],
    },
    devtool: {
      flags: '--devtool [devtool]',
      description: 'Enable sourcemaps',
      default: false,
      optional: true,
    },
    log: {
      flags: '--log [log]',
      description:
        'Enable logging output. Pass a string to log to a file.',
      default: false,
      optional: true,
    },
    manifest: {
      flags: '--manifest [manifest]',
      description: 'Produce a manifest.json',
      default: true,
      optional: true,
      choices: ['true', 'false'],
    },
    minify: {
      flags: '--minify [minify]',
      description: 'Enable minification',
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
      description: 'Produce a vendor bundle',
      default: false,
      optional: true,
      choices: ['true', 'false'],
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
