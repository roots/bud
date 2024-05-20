import type {Bud} from '@roots/bud'

import {isset} from '@roots/bud/cli/helpers/isset'
import get from '@roots/bud-support/get'
import noop from '@roots/bud-support/noop'

export type Override<T extends unknown> = [
  T,
  string,
  string,
  (bud: Bud) => (value: T) => Promise<unknown>,
  children?: boolean,
]

export default async function override(
  bud: Bud,
  arg: unknown,
  env: string,
  manifestPath: string | undefined,
  fn: (bud: Bud) => (value: any) => Promise<any>,
  children: boolean = true,
) {
  if (
    !isset(arg) &&
    manifestPath &&
    bud.context.manifest?.bud &&
    manifestPath in bud.context.manifest?.bud
  ) {
    arg = get(bud.context.manifest.bud, manifestPath)
  }

  if (!isset(arg) && bud.env.has(env)) {
    arg = bud.env.get(env)
  }

  if (!isset(arg)) return

  await fn(bud)(arg)
  children && bud.hasChildren && (await withChildren(bud, arg, fn))
}

export const withChildren = async (
  bud: Bud,
  value: any,
  fn: (bud: Bud) => (value: any) => Promise<any>,
) => {
  bud.hasChildren &&
    (await Promise.all(
      [bud, ...Object.values(bud.children)].map(
        async bud => await fn(bud)(value).catch(noop),
      ),
    ))
}
