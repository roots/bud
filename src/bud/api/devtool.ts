import type { Bud, Devtool } from "./types";

/**
 * Specify webpack devtool
 */
const devtool: Devtool = function (devtool: string): Bud {
  this.state.options.devtool = devtool;

  return this;
};

export { devtool };
