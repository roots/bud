import Service from './Service'
import {Framework, Mode, Webpack} from '@roots/bud-typings'

export default class extends Service implements Mode {
  public get(): Webpack.Configuration['mode'] {
    return this.app.config.get('mode')
  }

  public set(mode: Webpack.Configuration['mode']): Framework {
    this.app.config.set('mode', mode)

    return this.app
  }

  public is(check: Webpack.Configuration['mode']): boolean {
    return this.app.config.is('mode', check)
  }
}
