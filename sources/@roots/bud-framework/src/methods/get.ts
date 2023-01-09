import type {Bud} from '../bud.js'

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
  const {isRoot, root, warn} = this as Bud

  !isRoot &&
    warn(`not root instance. returning from the context of ${root.label}`)

  if (!root.children[label]) {
    throw new Error(`${label} instance not found`)
  }

  root.success(`returning child instance:`, label)

  return root.children[label]
}
