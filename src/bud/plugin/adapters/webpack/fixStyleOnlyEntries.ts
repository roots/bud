import FixStyleOnlyEntriesPlugin from "webpack-fix-style-only-entries";
import type { WebpackAdapter } from "./types";

const fixStyleOnlyEntries: WebpackAdapter = () => ({
  options: {
    silent: true,
  },
  make: function () {
    return new FixStyleOnlyEntriesPlugin(this.options);
  },
  when: function () {
    return (
      this.bud.featureEnabled("css") ||
      this.bud.featureEnabled("scss") ||
      this.bud.featureEnabled("postcss") ||
      this.bud.featureEnabled("scssModules") ||
      this.bud.featureEnabled("cssModules")
    );
  },
});

export { fixStyleOnlyEntries };
