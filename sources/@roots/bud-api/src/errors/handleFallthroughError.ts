import type {Bud} from '@roots/bud-framework'

/**
 * Handle fallthrough
 */
export async function handleFallthroughError(
  bud: Bud,
  label: string,
): Promise<never> {
  // this should never be called
  bud.api.logger.error(label, `unhandled error`)
  throw new Error()
}
