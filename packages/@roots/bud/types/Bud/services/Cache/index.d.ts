import {Cache as Base} from '@roots/bud-cache'
import {Service} from '@roots/bud-framework'
/**
 * Handles cache invalidation, version generation, and the setting of 'build/cache' config hooks.
 *
 * @remarks
 * 📝 Interfaces with:
 *  - {@link Discovery} to determine project dependencies for snapshotting/validation.
 *  - {@link Build} via {@link Hooks} to update config.
 *
 * 📝 Adds to `bud`:
 *  - {@link Bud.persist} - Toggles cache settings
 *
 * @public
 * @sealed
 */
declare class Cache extends Base implements Service {}
export {Cache}
//# sourceMappingURL=index.d.ts.map
