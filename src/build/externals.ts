import type { Bud } from "./types";

const externals = (bud: Bud) => ({
  bud,
  options: {},
  make: function () {
    if (this.bud.state.options.externals) {
      this.options.externals = this.bud.state.options.externals;
    }

    return this.options;
  },
});

export { externals };
