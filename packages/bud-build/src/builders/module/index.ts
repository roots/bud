import {Webpack, Bud} from '@roots/bud-typings'
import {rules} from './rules'

type Cfg = Webpack.Configuration['module']
type Module = (this: Bud.Contract) => {module: Cfg}

export const moduleBuilder: Module = function () {
  return {
    module: this.hooks.filter<Cfg>('webpack.module', {
      ...this.config.get('module'),
      ...rules.bind(this)(),
    }),
  }
}
