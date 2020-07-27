import type { Bud, Watch } from "./types";

/**
 * ## bud.splitting
 *
 * Enable or disable code splitting.
 *
 * ```js
 * bud.splitting(false)
 * ```
 */
const splitting: Function = function (this: Bud, enabled: boolean): Bud {
  this.state.features.splitting = enabled ?? true;

  return this;
};

export { splitting };
