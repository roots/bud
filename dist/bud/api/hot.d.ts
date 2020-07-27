import type { Bud } from './types';
/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
declare const hot: (this: Bud, options: {
    enabled: boolean;
    target: string;
    port?: number;
    watch?: string[];
}) => Bud;
export { hot };
//# sourceMappingURL=hot.d.ts.map