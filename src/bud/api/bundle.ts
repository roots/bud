import type { Bud, Bundle } from "./types";

/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *   bud.src('app.js'),
 *   bud.src('app.css'),
 * ])
 * ```
 */
const bundle: Bundle = function (
  this: Bud,
  name: string,
  entries: object
): Bud {
  this.state.options.entry = {
    ...this.state.options.entry,
    [`${name}`]: entries,
  };

  return this;
};

export { bundle };
