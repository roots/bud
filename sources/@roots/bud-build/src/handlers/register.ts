import type {Bud} from '@roots/bud-framework'

import type {Factory} from './index.js'
import * as items from './items/items.js'
import * as loaders from './loaders/loaders.js'
import {rules} from './rules/index.js'

/**
 * Registry factory curry function
 */
export interface makeRegister {
  <T, F extends CallableFunction>(props: Partial<Bud>, setRule: F): <
    K extends keyof T & string,
  >([key, factory]: [K, Factory<T[K]>]) => void
}

/**
 * Register built-in {@link loaders}, {@link items} and {@link rules}
 */
export async function register(bud: Bud) {
  await Promise.all([
    ...Object.entries(loaders).map(makeRegister(bud, bud.build.setLoader)),
    ...Object.entries(items).map(makeRegister(bud, bud.build.setItem)),
  ])

  // this is a bit of a hack
  // that sets the base stylesheet loader
  // to minicss in production and style-loader in development
  bud.build.items.precss = bud.isProduction
    ? bud.build.items.minicss
    : bud.build.items.style

  Object.entries(rules).map(makeRegister(bud, bud.build.setRule))
}

export const makeRegister: makeRegister =
  ({build, hooks, isProduction, path, module: {resolve}}, setRule) =>
  async ([key, factory]) =>
    setRule(
      key,
      await factory({
        filter: hooks.filter,
        makeItem: build.makeItem,
        makeLoader: build.makeLoader,
        makeRule: build.makeRule,
        isProduction,
        path,
        resolve,
      }),
    )
