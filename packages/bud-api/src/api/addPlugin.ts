import {Extension} from '@roots/bud-extensions/src/Extension'
import {lodash as _} from '@roots/bud-support'
import type {Bud, Fluent} from '@roots/bud-typings'

export const addPlugin: AddPlugin = function (
  args: Extension.Controller,
) {
  this.extensions.set(name, args)

  return this
}

/**
 * Add a webpack plugin.
 */
export type AddPlugin = Fluent<
  Bud,
  string,
  Extension.Make,
  Extension.Conditional
>
