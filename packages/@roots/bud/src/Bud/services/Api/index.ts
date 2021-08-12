import {Api as Base, Repository} from '@roots/bud-api'

/**
 * Provides macros/facades for assisting with common config tasks.
 *
 * @remarks
 * 📝 {@link Repository} container items are bound to `bud` during {@link Service.bootstrap}.
 *
 * @public
 * @sealed
 */
export class Api extends Base {}

export {Repository}
