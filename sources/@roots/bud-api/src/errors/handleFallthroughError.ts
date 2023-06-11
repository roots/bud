import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'

/**
 * Handle fallthrough
 */
export async function handleFallthroughError(
  bud: Bud,
  label: string,
  errorOptions: (typeof InputError)[`arguments`][1] = {},
): Promise<never> {
  throw new InputError(`Invalid input in ${label}`, errorOptions)
}
