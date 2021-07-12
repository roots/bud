import {
  Logger as Contract,
  Bootstrapper,
  Framework,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {Signale} from 'signale'

/**
 * Logger service
 */
export class Logger
  extends Container
  implements Contract, Bootstrapper
{
  public name = 'service/logger'

  public _app: () => Framework

  public _instance: Signale

  public get instance() {
    return this._instance
  }

  public set instance(instance) {
    this._instance = instance
  }

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    super()

    this._app = () => app

    this._instance = new Signale({
      disabled: true,
      interactive: false,
      secrets: [process.cwd()],
      scope: app.name,
      types: {
        log: {
          label: 'log',
          badge: '≫',
          color: 'magentaBright',
        },
      },
      stream: [process.stdout],
    })

    this._instance.config({
      displayScope: true,
      displayBadge: true,
      displayDate: false,
      displayFilename: false,
      displayLabel: false,
      displayTimestamp: false,
      underlineLabel: false,
      underlineMessage: false,
      underlinePrefix: false,
      underlineSuffix: false,
      uppercaseLabel: false,
    })

    if (process.argv.includes('--log')) {
      this._instance.enable()
    }
  }
}
