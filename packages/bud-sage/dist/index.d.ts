import type { Bud, Extension } from '@roots/bud';
/**
 * Available features.
 */
declare type FeatureKey = 'purge' | 'eslint' | 'stylelint' | 'extraction' | 'sass';
/**
 * Map features to their extensions
 */
interface Features {
    [key: string]: Extension;
}
interface Enabled {
    key: FeatureKey;
    value: boolean;
}
/**
 * ## bud.sage
 *
 * Customize the features used in your theme.
 *
 * ```js
 * bud.sage({
 *  purge: false,
 * })
 */
interface Sage {
    (this: Bud, enabled: Enabled): Bud;
}
/**
 * @roots/bud-sage
 *
 * Preset configuration for Sage projects
 */
declare const sage: Extension;
export { sage };
export { Sage, FeatureKey, Features, Enabled };
//# sourceMappingURL=index.d.ts.map