import type { Bud } from './types';
/**
 * ## bud.featureEnabled
 *
 * Return a boolean representing if a feature is enabled.
 *
 * ```js
 * bud.featureEnabled('eslint')
 * // returns true if eslint enabled
 * ```
 */
declare const featureEnabled: (this: Bud, feature: string) => boolean;
export { featureEnabled };
//# sourceMappingURL=featureEnabled.d.ts.map