import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'
import Base from './Base'

export abstract class Extension extends Base {
  @bind
  public register() {
    this.app.when(this.module.options, () =>
      this.set('options', () => this.module.options),
    )

    this.app.when(this.module.hasOwnProperty('api'), () => {
      Object.assign(this.app, this.app.access(this.module.api))
    })

    this.app.when(this.module.register, () => {
      this.app.access(this.module.register)
    })

    this.set('when', () => this.module.when)
    this.set('make', () => this.module.make)

    this.logger
      .scope(this.name as string)
      .success('Extension registered')

    return this
  }

  @bind
  public boot() {
    this.app.when(this.module.boot, () => {
      this.module.boot(this.app)
    })

    this.logger
      .scope(this.name as string)
      .success('Extension booted')

    return this
  }
}
