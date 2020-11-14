import {Webpack, Bud, Container} from '@roots/bud-typings'
import {rules} from './rules'

type Cfg = Webpack.Configuration['module']
type Module = (this: Bud.App, config: Container) => {module: Cfg}

export const moduleBuilder: Module = function (config) {
  return {
    module: this.hooks.filter<Cfg>('webpack.module', {
      ...config.get('module'),
      ...rules.bind(this)(),
    }),
  }
}
