import {Module} from '@roots/bud-framework'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'
import Base from './Base'

export class Extension extends Base implements Module {
  @bind
  public register({when}): this {
    when(this.module.register, () => {
      this.app.access(this.module.register)
      this.app.extensions.log(`Register method found`)
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

    when(this.module.dependencies, () =>
      this.set('dependencies', () => this.module.dependencies),
    )

    this.module.devDependencies &&
      this.set(
        'devDependencies',
        () => this.module.devDependencies,
      )

    this.module.when && this.set('when', () => this.module.when)
    this.module.make && this.set('make', () => this.module.make)

    this.app.store.enabled('install') && this.install()

    this.logger.scope(this.name).success('Extension registered')

    return this
  }

  @bind
  public boot(): this {
    this.module.boot && this.app.access(this.module.boot)
    this.logger.scope(this.name).success('Extension booted')

    return this
  }

  @bind
  public install(): void {
    this.dependencies &&
      !_.isEmpty(this.dependencies) &&
      this.app.dependencies.install(this.dependencies, this.name)

    this.devDependencies &&
      !_.isEmpty(this.devDependencies) &&
      this.app.dependencies.installDev(
        this.devDependencies,
        this.name,
      )
  }
}
