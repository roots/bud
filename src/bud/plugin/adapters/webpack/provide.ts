import { ProvidePlugin } from "webpack";
import type { WebpackAdapter } from "./types";

const provide: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.state.options.auto;
  },
  make: function () {
    return new ProvidePlugin(this.options);
  },
  when: function () {
    return this.options;
  },
});

export { provide };
