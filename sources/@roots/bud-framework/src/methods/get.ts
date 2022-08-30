import type {Bud} from '../bud'

export interface get {
  (label: string, tap?: (bud: Bud) => Promise<Bud>): Promise<Bud>
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
 *
 * @public
 */
export const get: get = async function (label: string): Promise<Bud> {
  const {isRoot, root, warn} = this as Bud

  !isRoot &&
    warn(`not root instance. returning from the context of ${root.label}`)

  !root.children[label] && root.fatal(`${label} instance not found`) // throws

  root.success(`returning child instance:`, label)

  return root.children[label]
}
