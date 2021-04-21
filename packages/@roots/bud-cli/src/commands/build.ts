import {Command} from '../Command'
import {boundMethod as bind} from 'autobind-decorator'
import {config} from '../config'

/**
 * Build
 */
export class Build extends Command {
  public name = `build`

  public signature = '<mode>'

  public description =
    'Compile assets and/or initialize development server'

  public arguments = {
    mode: '[choices: "development" or "production"]',
  }

  public options = {
    ci: {
      type: 'boolean',
      description: 'Run in CI',
      default: false,
    },
    hot: {
      type: 'boolean',
      description: 'Hot middleware',
      default: true,
    },
  }

  /**
   * JSON name
   */
  @bind
  public jsonName() {
    return `${this.cli.app.name}.config.json`
  }

  /**
   * Fluent name
   */
  @bind
  public fluentName() {
    return `${this.cli.app.name}.config.js`
  }

  /**
   * Preflight check
   */
  @bind
  public async action(
    mode: unknown,
    options: {
      ci: boolean
      hot: boolean
    },
  ) {
    /**
     * Assign to process
     */
    Object.assign(process.env, {
      NODE_ENV: mode,
      BABEL_ENV: mode,
    })

    const instance = config(this.cli.name)(this.cli.app)

    options.ci && instance.store.set('ci', true)

    !options.hot &&
      instance.server.config.set('middleware.hot', options.hot)

    instance.run()
  }
}
