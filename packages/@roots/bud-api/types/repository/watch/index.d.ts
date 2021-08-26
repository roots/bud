import type { Framework, Server } from '@roots/bud-framework';
/**
 * Configure the list of files that, when modified,
 * will force the browser to reload (even in hot mode).
 *
 * @example
 * ```js
 * app.watch(['templates/*.html'])
 * ```
 */
interface watch {
    (files: Server.Configuration['watch']['files'], options?: Server.Configuration['watch']['options']): Framework;
}
declare const watch: watch;
export { watch };
//# sourceMappingURL=index.d.ts.map