import type {Bud} from '@roots/bud'

import {isset} from '@roots/bud/cli/helpers/isset'
import get from '@roots/bud-support/get'
import noop from '@roots/bud-support/noop'

export type Override<T extends unknown> = [
  T,
  string,
  string,
  (bud: Bud) => (value: T) => Promise<unknown>,
]

export default async function override(
  bud: Bud,
  arg: unknown,
  env: string,
  manifestPath: string | undefined,
  callback: (bud: Bud) => (value: any) => Promise<any>,
) {
  if (isset(arg)) {
    return await withChildren(bud, arg, callback)
  }

  if (manifestPath && bud.context.manifest.bud) {
    const value = get(bud.context.manifest.bud, manifestPath)
    if (value) {
      return await withChildren(bud, value, callback)
    }
  }

  if (bud.env.has(env)) {
    return await withChildren(bud, bud.env.get(env), callback)
  }
}

/**
 * Override settings:
 *
 * - when children: all children but not the parent
 * - when no children: the parent;
 */
export const withChildren = async (
  bud: Bud,
  value: any,
  makeFn: (bud: Bud) => (value: any) => Promise<any>,
) => {
  await makeFn(bud)(value).catch(noop)

  bud.hasChildren &&
    (await Promise.all(
      [bud, ...Object.values(bud.children)].map(
        async bud => await makeFn(bud)(value).catch(noop),
      ),
    ))
}
