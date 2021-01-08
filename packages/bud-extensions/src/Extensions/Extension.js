"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bud_support_1 = require("@roots/bud-support");
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
class default_1 extends bud_support_1.ServiceContainer {
    constructor() {
        super(...arguments);
        /**
         * Registration functions
         */
        this.builders = [
            ['setLoaders', this.app.build.setLoader.bind(this)],
            ['setItems', this.app.build.setItem.bind(this)],
            ['setRules', this.app.build.setRule.bind(this)],
        ];
    }
    /**
     * Initialize extension.
     */
    init() {
        this.make = this.make.bind(this);
        this.isPlugin = this.isPlugin.bind(this);
        this.isPluginEnabled = this.isPluginEnabled.bind(this);
        this.setApp = this.setApp.bind(this);
        this.setBuilders = this.setBuilders.bind(this);
        this.setStore(this.extension);
        this.setBuilders();
        this.get('api') && this.setApp(this.api);
        this.get('register') && this.get('register')(this.app);
        this.has('boot') &&
            this.set('boot', this.app.access(this.get('boot')));
        return this;
    }
    /**
     * Make plugin.
     */
    make() {
        if (!this.isPlugin() || !this.isPluginEnabled()) {
            return null;
        }
        const make = this.app.access(this.get('make'));
        const options = this.app.access(this.get('options'));
        return make(options, this.app);
    }
    /**
     * Is this extension a plugin?
     */
    isPlugin() {
        return this.has('make');
    }
    /**
     * Is plugin enabled?
     */
    isPluginEnabled() {
        if (!this.has('when'))
            return true;
        const when = this.get('when');
        const options = this.app.makeContainer(this.get('options'));
        if (bud_support_1.isFunction(when)) {
            return when(this.app, options);
        }
        return when;
    }
    /**
     * ## extension.setApi
     */
    setApp(set) {
        Object.defineProperties(this.app, this.app.access(set));
    }
    /**
     * ## extension.setBuilders
     */
    setBuilders() {
        this.builders
            // only dealing with registrable fns here
            .filter(([name]) => this.get(name))
            // loop through the fns as there maybe multiple matches
            .map(([name, handler]) => {
            /**
             * If the registration is a fn, we'll call it
             * and be left with the contents.
             */
            const registrable = this.app.access(this.get(name));
            /**
             * Register array of tuple definitions
             */
            const registerTuples = (registrationFn, tuples) => {
                tuples.forEach(tuple => {
                    registrationFn(...tuple);
                });
            };
            /**
             * Duck: Arrays are exclusive to tuple definition
             */
            if (Array.isArray(registrable)) {
                /**
                 * A single tuple will have an ident as the first field
                 */
                if (typeof registrable[0] == 'string') {
                    const single = registrable;
                    return registerTuples(handler, [single]);
                }
                /**
                 * The rest are multidimensional tuple definitions
                 */
                const many = registrable;
                return registerTuples(handler, many);
            }
            /**
             * Anything that isn't an array must be an object
             */
            if (!bud_support_1.isArray(registrable)) {
                const asObject = registrable;
                return registerTuples(handler, Object.entries(this.app.access(asObject)));
            }
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=Extension.js.map