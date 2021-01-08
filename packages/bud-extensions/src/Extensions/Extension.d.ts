/// <reference types="webpack" />
import { Framework, Index, Loader, Rule, Item } from '@roots/bud-typings';
import { ServiceContainer } from '@roots/bud-support';
declare type Registrable = Item | Rule | Loader;
declare type RegistrationFn = (name: string, registrable: Registrable) => Registrable;
declare type Builders = [string, RegistrationFn][];
/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export default class extends ServiceContainer<Framework> {
    /**
     * Registration functions
     */
    builders: Builders;
    /**
     * Initialize extension.
     */
    init(): this;
    /**
     * Make plugin.
     */
    make(): Framework.Webpack.Plugin;
    /**
     * Is this extension a plugin?
     */
    isPlugin(): boolean;
    /**
     * Is plugin enabled?
     */
    isPluginEnabled(): boolean;
    /**
     * ## extension.setApi
     */
    protected setApp<T = unknown>(set: Index<T>): void;
    /**
     * ## extension.setBuilders
     */
    protected setBuilders(): void;
}
export {};
//# sourceMappingURL=Extension.d.ts.map