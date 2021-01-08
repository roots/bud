import { ServiceContainer } from '@roots/bud-support';
import type { Framework, Extensions } from '@roots/bud-typings';
import type Extension from './Extension';
export default abstract class extends ServiceContainer<Framework> implements Extensions {
    /**
     * Register a plugin to be utilized during compilation.
     */
    abstract register(): void;
    /**
     * Register a plugin to be utilized during compilation.
     */
    abstract set<T = Extension>(name: string, extension: T): this;
    /**
     * Register a plugin to be utilized during compilation.
     */
    abstract use(pkg: string): this;
}
//# sourceMappingURL=Service.d.ts.map