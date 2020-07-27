import { DefinePlugin } from "webpack";
import type { WebpackAdapter } from "./types";

const define: WebpackAdapter = () => ({
  mergeOptions: function () {
    return this.bud.state.options.env;
  },
  make: function () {
    return new DefinePlugin(this.options);
  },
  when: function () {
    return this.options;
  },
});

export { define };
