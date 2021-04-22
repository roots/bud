import './interface'
import {
  Framework,
  Index,
  Service,
  Bootstrapper,
} from '@roots/bud-framework'
import {Bud as App, services} from './Bud'

declare type Bud = Framework

declare type BudFactory = (
  services: Index<
    new (app: Framework['get']) => Service | Bootstrapper
  >,
  mode: 'production' | 'development',
) => Bud

const bud: BudFactory = (services, mode) => {
  return new App().bootstrap(services, mode)
}

export {bud, services}
export {Bud, BudFactory, Framework}
