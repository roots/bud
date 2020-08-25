import { Bud } from '@roots/bud';
/**
 * ## bud.scss
 *
 * Enable/disable scss support
 *
 * ```js
 * bud.scss(true)
 * ```
 *
 * ```js
 * bud.scss(false)
 * ```
 */
declare type SassConfig = (this: Bud, options?: any) => Bud;
declare const config: SassConfig;
export { config };
//# sourceMappingURL=api.d.ts.map