import type { Bud, Controller } from "./types";

/**
 * Plugin controller
 * @this {Bud}
 */
const controller = function (bud: Bud): Controller {
  return {
    bud,

    /**
     * Initialize controller.
     * @property {Controller.initController}
     */
    initController: function ([name, plugin]): Controller {
      this.name = name;
      this.plugin = plugin;

      return this;
    },

    /**
     * Build plugin.
     */
    buildPlugin: function () {
      this.initPlugin();
      this.bindPluginProps();
      this.setPluginOptions();
      this.mergePluginOptions();

      return this.makePlugin();
    },

    /**
     * Initialize plugin.
     * @property {function} initPlugin
     * @return   {void}
     */
    initPlugin: function (): void {
      this.doPluginHook("pre_init");
      this.plugin = this.plugin(this.bud);
      this.doPluginHook("post_init");
    },

    /**
     * Bind plugin props.
     * @property {function} bindProps
     * @return   {void}
     */
    bindPluginProps: function (): void {
      this.doPluginHook("pre_bind");

      this.ensurePluginProp("bud", this.bud);
      this.ensurePluginProp("options", this.bud.util.fab.undefined());
      this.ensurePluginProp("setOptions", this.bud.util.fab.undefined);
      this.ensurePluginProp("mergeOptions", this.bud.util.fab.undefined);
      this.ensurePluginProp("when", this.bud.util.fab.true);

      this.doPluginHook("post_bind");
    },

    /**
     * Ensure plugin prop is set.
     * @property {function} ensurePluginProp
     * @param    {string} prop - plugin property
     * @param    {any} fallback - fallback value
     * @return   {void}
     */
    ensurePluginProp: function (prop, fallback): void {
      this.plugin[prop] = this.plugin[prop] || fallback;
    },

    /**
     * Set plugin options.
     * @property {function} setPluginOptions
     * @return   {void}
     */
    setPluginOptions: function (): void {
      this.doPluginHook("pre_options");

      this.boundValue = this.plugin.setOptions();

      if (this.boundValue) {
        this.doPluginHook("options", this.boundValue);

        this.plugin.options = this.boundValue;
      }

      delete this.boundValue;

      this.doPluginHook("post_options");
    },

    /**
     * Set plugin options.
     * @property {function} setPluginOptions
     * @return   {void}
     */
    mergePluginOptions: function (): void {
      this.doPluginHook("pre_merge");

      this.boundValue = this.plugin.mergeOptions();

      if (this.boundValue) {
        this.doPluginHook("merge", this.boundValue);

        this.plugin.options = {
          ...this.plugin.options,
          ...this.boundValue,
        };
      }

      delete this.boundValue;

      this.doPluginHook("post_merge");
    },

    /**
     * Make plugin.
     * @property {function} makePlugin
     * @return   {object} constructed webpack plugin
     */
    makePlugin: function (): object {
      this.doPluginHook("pre");

      this.plugin =
        this.plugin.when() && this.plugin.make
          ? this.plugin.make()
          : this.bud.util.fab.undefined();

      this.doPluginHook("post");

      return this.plugin;
    },

    /**
     * Do plugin hook.
     * @property {function} doPluginHook
     * @return   {void}
     */
    doPluginHook: function (hook, ...params): void {
      this.bud.hooks.call(`${hook}_${this.name}`, this.plugin, ...params);
    },
  };
};

export { controller };
