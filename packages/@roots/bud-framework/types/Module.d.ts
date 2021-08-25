import type { Container } from '@roots/container';
import type { Framework } from './';
/**
 * A {@link Framework Framework} extension
 */
interface Module<Plugin = any, Options = any> {
    /**
     * The module name
     */
    name?: Module.Name;
    /**
     * Options registered to the extension module
     */
    options?: Module.Options<Options>;
    /**
     * General purpose callback. Called first.
     */
    register?: Module.Register;
    /**
     * General purpose callback. Called after everything else.
     */
    boot?: Module.Boot;
    /**
     * Objects to bind to the framework.
     */
    api?: Module.Api;
    /**
     * Returns an instantiated webpack plugin
     *
     * @deprecated Convert this instance to a {@link Plugin Plugin}
     */
    make?: Module.Make<Plugin, Options>;
    /**
     * Webpack plugin apply.
     *
     * @deprecated Convert this instance to a {@link Plugin Plugin}
     */
    apply?: CallableFunction;
    /**
     * Returns a boolean determining if
     * a webpack plugin should be used in
     * compilation.
     *
     * @deprecated Convert this instance to a {@link Plugin Plugin}
     */
    when?: Module.When<Options>;
}
declare namespace Module {
    type Name = keyof Framework.Extensions;
    type Api = ((app: Framework) => {
        [key: string]: any;
    }) | {
        [key: string]: any;
    };
    type Boot = (app: Framework) => any;
    type Register = (app: Framework) => any;
    type Config = (app: Framework) => any;
    type Options<T = any> = T | ((app: Framework) => T);
    type Make<Plugin = any, Opts = any> = (options?: Container<Opts>, app?: Framework) => Plugin;
    type When<T = any> = ((app: Framework, opt?: Container<T>) => boolean) | boolean;
}
export { Module };
//# sourceMappingURL=Module.d.ts.map