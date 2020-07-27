import type { Bud } from "./types";

/**
 * ## bud.option
 *
 * Get the current value of a bud option
 *
 * ### Example
 *
 * ```js
 * bud.option(')
 * ```
 */
const option: Function = function (key: string): any {
  return this.state.options[key];
};

export { option };
