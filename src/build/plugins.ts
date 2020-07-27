import type { Bud, RegisteredPlugin } from "./types";

/**
 * Webpack plugins.
 */
const plugins = (bud: Bud) => ({
  bud,

  pluginQueue: bud.state.plugins.adapters,

  make: function () {
    this.doHook("pre");

    this.plugins = this.pluginQueue
      .map((plugin: RegisteredPlugin) =>
        this.bud.plugin.controller.initController(plugin).buildPlugin()
      )
      .filter((plugin) => plugin !== undefined);

    this.doHook("post");

    return {
      plugins: this.plugins,
    };
  },

  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_plugins`, this, params);
  },
});

export { plugins };
