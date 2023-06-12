import type {Bud} from '@roots/bud-framework'

import type {Rule} from '../rule/index.js'

import * as items from './items/items.js'
import * as loaders from './loaders/loaders.js'
import {register} from './register.js'
import {rules} from './rules/index.js'

export interface Props {
  filter: Bud[`hooks`][`filter`]
  isProduction: Bud[`isProduction`]
  makeItem: Bud[`build`][`makeItem`]
  makeLoader: Bud[`build`][`makeLoader`]
  makeRule: Bud[`build`][`makeRule`]
  path: Bud[`path`]
  resolve: Bud[`module`][`resolve`]
}

export interface Factory<T = Rule> {
  (props: Props): Promise<T>
}

export {items, loaders, register, rules}
