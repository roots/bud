import {Module} from '@roots/bud-framework'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'
import Base from './Base'

export class Extension extends Base implements Module {
  @bind
  public register({when}): this {
    when(this.module.register, () => {
      this.app.access(this.module.register)
    })

    when(this.module.api, () =>
      Object.assign(this.app, this.app.access(this.module.api)),
    )

    when(this.module.publish, () =>
      this.app.publish(
        this.app.access<{[key: string]: any}>(
          this.module.publish,
        ),
      ),
    )

    when(this.module.options, () =>
      this.set('options', () => this.module.options),
    )

    this.set('when', () => this.module.when)
    this.set('make', () => this.module.make)

    this.logger.scope(this.name).success('Extension registered')

    return this
  }

  @bind
  public boot(): this {
    this.module.boot && this.app.access(this.module.boot)
    this.logger.scope(this.name).success('Extension booted')

    return this
  }
}
