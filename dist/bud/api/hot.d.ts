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
    host: string;
    port?: number;
    watch?: string[];
    open?: boolean;
    headers?: object;
    secure?: boolean;
}) => Bud;
export { hot };
//# sourceMappingURL=hot.d.ts.map