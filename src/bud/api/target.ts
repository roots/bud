import type { Bud, Target } from "./Types";

/**
 * bud.target
 *
 * Set the build target.
 *
 * ```js
 * bud.target('web') // default
 * ```
 */
const target: Target = function (target: string): Bud {
  this.state.options.target = target;

  return this;
};

export { target };
