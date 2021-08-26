import type { Framework } from '@roots/bud-framework';
import { config } from '../config';
/**
 * Create a Bud instance in Node
 */
interface Factory {
    (overrides?: Factory.Options): Framework;
}
declare namespace Factory {
    /**
     * Overrides for extensions, services and base configuration.
     */
    interface Options {
        /**
         * Application name
         *
         * @remarks
         * The name of the parent compiler is used as a base when sourcing configuration files.
         * So, in an implementation that uses the name `app`, the Framework will be sourcing
         * `app.config.js`, `app.development.config.js`, etc.
         */
        name?: Framework['name'];
        /**
         * Compilation mode
         */
        mode?: Framework['mode'];
        /**
         * Framework base configuration
         */
        config?: config;
        /**
         * Registered services
         */
        services?: Framework.Services;
    }
}
/**
 *
 */
declare const Factory: (overrides: Factory.Options) => Framework;
export { Factory };
//# sourceMappingURL=index.d.ts.map