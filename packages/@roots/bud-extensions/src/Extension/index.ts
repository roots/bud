import _ from 'lodash'
import {Extension as Base, Module} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'

export class Extension extends Base implements Module {
  @bind
  public register() {
    this.app.when(this.module.options, () =>
      this.set('options', () => this.module.options),
    )

    this.app.when(this.module.hasOwnProperty('api'), () => {
      Object.assign(
        this.app,
        _.isFunction(this.module.api)
          ? this.module.api(this.app)
          : this.module.api,
      )
    })

    this.app.when(this.module.register, () => {
      this.module.register(this.app)
    })

    this.set('when', () => this.module.when)
    this.set('make', () => this.module.make)

    return this
  }

  @bind
  public boot() {
    this.app.when(this.module.boot, () => {
      this.module.boot(this.app)
    })

    return this
  }
}
