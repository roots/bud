"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("@roots/container");
const bud_support_1 = require("@roots/bud-support");
const use_1 = require("./use");
const when_1 = require("./when");
const Base_1 = __importDefault(require("./Base"));
class default_1 extends Base_1.default {
    constructor(providers) {
        super();
        /**
         * Bindings
         */
        this.bootstrap = this.bootstrap.bind(this);
        this.get = this.get.bind(this);
        this.use = use_1.use.bind(this);
        this.when = when_1.when.bind(this);
        this.pipe = this.pipe.bind(this);
        this.makeContainer = this.makeContainer.bind(this);
        this.access = this.access.bind(this);
        this.init = this.init.bind(this);
        this.register = this.register.bind(this);
        this.boot = this.boot.bind(this);
        /**
         * Essential containers
         */
        this.store = this.makeContainer();
        this.services = this.makeContainer();
        this.providers = this.makeContainer();
        /**
         * Set providers
         */
        this.providers.setStore(Object.assign({}, providers));
        /**
         * This "fixes" resize emitter warnings
         * @todo actually fix this
         */
        // process.setMaxListeners(0)
        /**
         * This fixes issues with SWR thinking its in the browser.
         * @todo does this fix the vue extension issue?
         */
        bud_support_1.isEqual(typeof global.navigator, 'undefined') &&
            Object.assign(global, {});
    }
    init() {
        this.bootstrap();
        this.register();
        this.boot();
        return this;
    }
    bootstrap() {
        this.providers
            /**
             * Make stores
             */
            .each('store', (name, store) => {
            this.store.set(name, store);
        })
            /**
             * Make API
             */
            .each('api', (name, fn) => {
            this[name] = fn.bind(this);
        });
        /**
         * Set features from CLI args
         * These need to be set before instantiating services
         */
        this.store.each('args', (name, value) => {
            this.store.set(`features.${name}`, value);
        });
        /**
         * Instantiate framework services
         */
        this.providers
            .get('services')
            .forEach(([name, Service, dependencies]) => {
            this.services.set(name, new Service(Object.assign({ app: this }, dependencies)));
            /**
             * Service getters and setters
             */
            if (this[name]) {
                throw Error(`${name} is already registered on ${this.name}`);
            }
            Object.defineProperty(this, name, {
                get() {
                    return this.services.get(name);
                },
                set(value) {
                    this.services.set(value);
                },
            });
        });
    }
    /**
     * Lifecycle: registration
     */
    register() {
        this.services.get('hooks').register();
        this.services.get('build').register();
        this.services.every(name => {
            if (['hooks', 'builders'].includes(name))
                return;
            Object.keys(this).includes(name) && this[name].register();
        });
    }
    boot() {
        this.services.get('hooks').boot();
        this.services.get('build').boot();
        this.services.every(name => {
            if (['hooks', 'builders'].includes(name))
                return;
            Object.keys(this).includes(name) && this[name].boot();
        });
    }
    get() {
        return this;
    }
    access(value) {
        return bud_support_1.isFunction(value)
            ? value(this)
            : value;
    }
    makeContainer(repository) {
        return new container_1.Container(repository !== null && repository !== void 0 ? repository : {});
    }
    pipe(fns) {
        fns.reduce((_val, fn) => {
            return fn(this);
        }, this);
        return this;
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map