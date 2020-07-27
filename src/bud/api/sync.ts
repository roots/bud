import type { Bud, Sync } from "./Types";

/**
 * ## bud.sync
 *
 * Configure BrowserSync.
 *
 * ```js
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * ```
 */
const sync: Sync = function ({ enabled = true, options }): Bud {
  this.state.features.browserSync = enabled;
  this.state.options.browserSync = {
    ...this.state.options.browserSync,
    ...options,
  };

  return this;
};

export { sync };
