/**
 * ## bud.translate
 *
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * ```js
 * bud.translate('resources/languages/sage.pot')
 * ```
 */
declare const translate: Translate;
export { translate };
export declare type Translate = (output: string) => Bud;
import type { Bud } from '..';
//# sourceMappingURL=translate.d.ts.map