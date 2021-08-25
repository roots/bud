import { Build as Base, Item, Loader, Rule } from '@roots/bud-build';
/**
 * Builds the Webpack configuration object
 *
 * @remarks
 * 📝 For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Build.Loaders} interface
 * - {@link Build.items} should be declared by augmenting the {@link Build.Items} interface
 * - {@link Build.rules} should be declared by augmenting the {@link Build.Rules} interface
 *
 * @sealed
 * @public
 */
declare class Build extends Base {
}
export { Build, Item, Rule, Loader };
//# sourceMappingURL=index.d.ts.map