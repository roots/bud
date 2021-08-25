import { Module } from './Module';
interface WebpackPlugin<WebpackPluginModule = {
    apply: any;
}, Options = any> extends Module {
    /**
     * Returns an instantiated webpack plugin
     */
    make?: Module.Make<WebpackPluginModule & {
        apply: any;
    }, Options>;
    /**
     * Webpack plugin apply.
     */
    apply?: CallableFunction;
    /**
     * Returns a boolean determining if a webpack plugin should be used in compilation.
     */
    when?: Module.When<Options>;
}
export { WebpackPlugin };
//# sourceMappingURL=WebpackPlugin.d.ts.map