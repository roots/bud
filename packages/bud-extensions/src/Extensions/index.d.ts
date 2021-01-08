import { Extensions } from '@roots/bud-typings';
import Extension from './Extension';
import Service from './Service';
/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Extensions {
    /**
     * Service register
     */
    register(): void;
    /**
     * Service boot
     */
    boot(): void;
    /**
     * ## bud.extensions.set
     *
     * Register an extension
     *
     * ### Usage
     *
     * ```js
     * bud.extensions.set('my-extension', {make: new Plugin()})
     * ```
     */
    set<T = Extension>(name: string, extension: T): this;
    /**
     * ## bud.extensionensions.use [🏠 Internal]
     *
     * Register an extension from a module name string.
     *
     * Projects shoul duse `bud.use` instead of
     * using this directly.
     *
     * ### Usage
     *
     * ```js
     * bud.extensions.use('@roots/bud-react')
     * ```
     */
    use(pkg: string): this;
}
//# sourceMappingURL=index.d.ts.map