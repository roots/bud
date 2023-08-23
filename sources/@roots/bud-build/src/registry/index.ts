import type Rule from '@roots/bud-build/rule'
import type {Bud} from '@roots/bud-framework'

import * as items from '@roots/bud-build/items'
import * as loaders from '@roots/bud-build/loaders'
import * as rules from '@roots/bud-build/rules'
import kebabCase from '@roots/bud-support/lodash/kebabCase'

interface Props {
  filter: Bud[`hooks`][`filter`]
  isProduction: Bud[`isProduction`]
  makeItem: Bud[`build`][`makeItem`]
  makeLoader: Bud[`build`][`makeLoader`]
  makeRule: Bud[`build`][`makeRule`]
  path: Bud[`path`]
  resolve: Bud[`module`][`resolve`]
}

interface Factory<T = Rule> {
  (props: Props): Promise<T>
}

/**
 * Register built-in {@link loaders}, {@link items} and {@link rules}
 */
async function register(bud: Bud) {
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

/**
 * Registry factory curry function
 */
interface makeRegister {
  <T, F extends CallableFunction>(
    props: Partial<Bud>,
    setRule: F,
  ): <K extends keyof T & string>([key, factory]: [
    K,
    Factory<T[K]>,
  ]) => void
}

/**
 * Registry factory
 */
const makeRegister: makeRegister =
  ({build, hooks, isProduction, module: {resolve}, path}, setRule) =>
  async ([key, factory]) =>
    setRule(
      kebabCase(key),
      await factory({
        filter: hooks.filter,
        isProduction,
        makeItem: build.makeItem,
        makeLoader: build.makeLoader,
        makeRule: build.makeRule,
        path,
        resolve,
      }),
    )

export {items, loaders, makeRegister, register, rules}
export type {Factory, Props}
