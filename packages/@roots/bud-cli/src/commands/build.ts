import {Command} from '../Command'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Build
 */
export class Build extends Command {
  public name = `build`

  public get signature() {
    return '<mode>'
  }

  public get description() {
    return 'Compile assets and/or initialize development server'
  }

  public get arguments() {
    return {
      mode: '[choices: "development" or "production"]',
    }
  }

  public options = {
    ci: {
      type: 'boolean',
      description: 'Run in CI',
      default: false,
    },
    debug: {
      type: 'boolean',
      description: 'Produce debug artifact',
      default: false,
    },
    log: {
      type: 'boolean',
      description: 'Enable logging',
      default: false,
    },
    hot: {
      type: 'boolean',
      description: 'Hot middleware',
      default: true,
    },
    cache: {
      type: 'boolean',
      description: 'Enable build cache',
      default: true,
    },
  }

  /**
   * Preflight check
   */
  @bind
  public async action(
    mode: 'development' | 'production',
    options: {
      ci: boolean
      hot: boolean
      log: boolean
      debug: boolean
      cache: boolean
    },
  ) {
    const app = this.cli.makeApp(mode)
    app.store.set('log', options.log)

    this.cli.runAppBuild(app, app => {
      app.store.set('debug', options.debug)
      app.store.set('ci', options.ci)
      app.server.config.set('middleware.hot', options.hot)

      !options.cache && app.hooks.on('build/cache', () => false)

      return app
    })
  }
}
