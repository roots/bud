import { join } from "path";
import type { Bud, SrcPath } from "./types";

/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src') // default unless specified
 * ```
 */
const srcPath: SrcPath = function (src: string): Bud {
  this.state.paths.src = join(this.state.paths.project, src);

  return this;
};

export { srcPath };
