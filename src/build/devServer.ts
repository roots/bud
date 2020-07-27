import type { Bud } from "./types";

/**
 * Dev server
 */
const devServer = (bud: Bud) => ({
  bud,
  options: {
    devServer: bud.state.options.dev,
  },
  make: function () {
    return this.options;
  },
});

export { devServer };
