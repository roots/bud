import { join } from "path";
import type { Resolve } from "./types";

/**
 * ## bud.resolve
 *
 * Resolve a module.
 *
 * ```js
 * bud.resolve('scripts/app.js')
 * ```
 */
const resolve: Resolve = function (moduleName: string): string {
  return require.resolve(
    join(this.state.paths.framework, "node_modules", moduleName)
  );
};

export { resolve };
