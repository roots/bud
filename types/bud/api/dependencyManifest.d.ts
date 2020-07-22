/**
 * ## bud.dependencyManifest
 *
 * @see     https://git.io/JJLxM
 *
 * ```js
 * bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
 * ```
 */
declare const dependencyManifest: DependencyManifest;
export { dependencyManifest };
import type { Bud } from '..';
export declare type DependencyManifest = (settings?: object) => Bud;
//# sourceMappingURL=dependencyManifest.d.ts.map