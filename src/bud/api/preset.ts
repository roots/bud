import { join } from "path";
import type { Preset } from "./types";

/**
 * ## bud.preset
 *
 * Retrieve a Bud framework preset.
 *
 * ### Examples
 *
 * ```js
 * bud.preset('babel/postcss')
 * ```
 *
 * ```js
 * bud.preset('babel/preset-react')
 * ```
 *
 * ```js
 * bud.preset('tsconfig')
 * ```
 */
const preset: Preset = function (relativePath): any {
  const presetConfig = join(this.state.paths.framework, "preset", relativePath);

  return require(presetConfig);
};

export { preset };
