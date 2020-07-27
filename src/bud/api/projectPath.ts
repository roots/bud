import type { Bud } from "./Types";

/**
 * ## bud.projectPath
 *
 * Set the project base path.
 *
 * ```js
 * bud.projectPath(__dirname)
 * ```
 */
const projectPath = function (dir: string): Bud {
  this.state.paths.project = dir;

  return this;
};

export { projectPath };
