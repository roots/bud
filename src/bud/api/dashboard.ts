import type { Bud, Dashboard } from "./types";

/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
const dashboard: Dashboard = function (this: Bud, enabled: boolean) {
  this.state.features.dashboard = enabled;

  return this;
};

export { dashboard };
