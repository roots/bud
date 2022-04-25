import {Bud} from '@roots/bud-framework'

import BudTypeCheckPlugin from './fork-ts-checker-webpack-plugin'

export interface typecheck {
  (
    this: Bud,
    options?: BudTypeCheckPlugin['options'] | boolean,
  ): Promise<Bud>
}

export interface facade {
  (this: Bud, options?: BudTypeCheckPlugin['options'] | boolean): Bud
}

export const typecheck: typecheck = async function (options?) {
  const app = this as Bud

  if (options === false) {
    app.extensions.has('fork-ts-checker-webpack-plugin') &&
      app.extensions.remove('fork-ts-checker-webpack-plugin')

    return app
  } else await app.extensions.add(BudTypeCheckPlugin)

  if (!options || options === true) return app

  app.extensions.get('fork-ts-checker-webpack-plugin').setOptions(options)

  return app
}
