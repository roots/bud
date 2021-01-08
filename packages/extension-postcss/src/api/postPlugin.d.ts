import { Framework } from '@roots/bud-typings';
import { AcceptedPlugin } from '../types';
export declare const postPlugin: PostPlugin;
/**
 * ## bud.postPlugin
 *
 * Add a postcss plugin.
 *
 * ### Usage
 *
 * ```js
 * bud.postPlugin(MyPlugin, {plugin: 'options'})
 * ```
 */
export declare type PostPlugin = (this: Framework, plugin: AcceptedPlugin, options?: unknown) => Framework;
//# sourceMappingURL=postPlugin.d.ts.map