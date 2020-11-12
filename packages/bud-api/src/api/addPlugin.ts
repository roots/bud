import type {Bud} from '@roots/bud-typings'

export function addPlugin<T>(
  this: Bud,
  name: string,
  make: T,
): Bud {
  this.extensions.set(name, {
    make,
  })

  return this
}
