/**
 * Plugin controller
 *
 * @type    {function} webpackPluginFactory
 * @param   {array}
 */
declare const webpackPluginFactory: ([name, plugin]: [any, any], bud: any) => {
    /**
     * Bud container.
     * @property {bud} bud
     */
    bud: any;
    /**
     * Plugin name.
     *
     * @property {string} name
     */
    name: any;
    /**
     * Plugin instance.
     * @property {object} plugin
     */
    plugin: any;
    /**
     * Build plugin.
     *
     * @property {function} build
     * @return   {Object}
     */
    build: () => any;
    /**
     * Bind plugin props.
     *
     * @property {function} bindPluginProps
     * @return   {void}
     */
    bindPluginProps: () => void;
    /**
     * Ensure plugin prop is set.
     *
     * @property {function} ensurePluginProp
     * @param    {string} prop - plugin property
     * @param    {any} fallback - fallback value
     * @return   {void}
     */
    ensurePluginProp: (prop: any, fallback: any) => void;
    /**
     * Initialize plugin.
     *
     * @property {function} initPlugin
     * @return   {void}
     */
    initPlugin: () => void;
    /**
     * Set plugin options.
     *
     * @property {function} setPluginOptions
     * @return   {void}
     */
    setPluginOptions: () => void;
    /**
     * Set plugin options.
     *
     * @property {function} setPluginOptions
     * @return   {void}
     */
    mergePluginOptions: () => void;
    /**
     * Make plugin.
     *
     * @property {function} makePlugin
     * @return   {object} constructed webpack plugin
     */
    makePlugin: () => any;
    /**
     * Do plugin hook.
     *
     * @property {function} doPluginHook
     * @return   {void}
     */
    doPluginHook: (hook: any, ...params: any[]) => void;
};
export { webpackPluginFactory };
