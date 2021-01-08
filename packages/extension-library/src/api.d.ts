import { Framework } from '@roots/bud-typings';
/**
 * ## bud.library  [💁 Fluent]
 *
 * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library))
 * caching of specified modules.
 *
 * - [🔗 Documentation](#)
 *
 * ### Usage
 *
 * Pass `bud.library` the module
 * you would like to add to the DLL cache:
 *
 * ```js
 * bud.library('jquery')
 * ```
 *
 * Multiple modules can be added at once by passing an array
 *
 * ```js
 * bud.library(['react', 'react-dom'])
 * ```
 */
export declare type Library = (this: Framework, modules: string[]) => Framework;
export declare const library: Library;
//# sourceMappingURL=api.d.ts.map