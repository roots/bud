import {Build as Contract, Service} from '@roots/bud-framework'
import Webpack from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'
import * as builders from '../builders'

export class Build extends Service implements Contract {
  public name = '@roots/bud-build'

  public get config(): Webpack.Configuration {
    return this.app.hooks.filter<Webpack.Configuration>('build')
  }

  @bind
  public boot(): void {
    Object.values(builders).forEach(builder => {
      builder.bind(this.app)()
    })
  }
}
