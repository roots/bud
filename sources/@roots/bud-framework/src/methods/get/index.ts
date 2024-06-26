import type {Bud} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'

export interface get {
  (label: string, tap?: (bud: Bud) => Bud): Bud
}

/**
 * Returns {@link Bud} instance from {@link Bud.children}
 *
 * @remarks
 * An optional {@link tap} function can be provided to configure the {@link Bud} instance.
 *
 * @example
 * ```js
 * bud.get(label)
 * ```
 */
export const get: get = function (label, tap) {
  const {isRoot, root, warn} = this

  !isRoot &&
    warn(
      `${label} instance requested from ${this.label}, but this is not the root instance. Returning from the context of ${root.label}`,
    )

  if (!root.children?.[label]) {
    throw BudError.normalize(
      `bud.get: bud.children['${label}'] is undefined`,
      {
        details: `There are no instances with the label "${label}" registered on the root instance.`,
        thrownBy: `bud.get`,
      },
    )
  }

  root.success(`returning child instance:`, label)

  return root.children[label]
}
