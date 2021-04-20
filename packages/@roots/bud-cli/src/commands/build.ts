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
    name: {
      type: 'string',
      description: 'Name of project',
      default: 'bud',
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
  public async action(...args: any[]) {
    config(this.cli.name)(this.cli.app).run()
  }
}
