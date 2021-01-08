"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders = __importStar(require("../builders"));
const Service_1 = __importDefault(require("./Service"));
/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
class default_1 extends Service_1.default {
    constructor() {
        super(...arguments);
        /**
         * ## bud.build.builders [🏠 Internal]
         *
         * Collection of functions processing loaders, items and rules
         * into a finalized webpack configuration.
         */
        this.builders = builders;
    }
    /**
     * Service registration
     */
    register() {
        this.make = this.make.bind(this);
        this.filterEmpty = this.filterEmpty.bind(this);
        this.getLoader = this.getLoader.bind(this);
        this.setLoader = this.setLoader.bind(this);
        this.getItem = this.getItem.bind(this);
        this.setItem = this.setItem.bind(this);
        this.getRule = this.getRule.bind(this);
        this.setRule = this.setRule.bind(this);
        this.loaders.every((name, loader) => {
            this.setLoader(name, loader);
        });
        this.items.every((name, item) => {
            this.setItem(name, item);
        });
        this.rules.every((name, rule) => {
            this.setRule(name, rule);
        });
    }
    /**
     * ## bud.build.make
     *
     * Produce a final webpack config.
     */
    make() {
        const config = Object.entries(builders).reduce((config, [, builder]) => (Object.assign(Object.assign({}, config), builder.bind(this.app)())), {});
        return this.filterEmpty(config);
    }
    /**
     * ### bud.build.filterEmpty [🏠 Internal]
     *
     * Filter rubbish config items.
     */
    filterEmpty(object) {
        return Object.entries(object).reduce((acc, [key, value]) => {
            return !value || value == {} ? acc : Object.assign(Object.assign({}, acc), { [key]: value });
        }, {});
    }
    /**
     * ### bud.build.getLoader
     *
     * Get a loader from the store.
     */
    getLoader(name) {
        return this.loaders.get(name);
    }
    /**
     * ### bud.build.setLoader
     *
     * Set a loader to the store. Returns the set loader.
     */
    setLoader(name, loader) {
        this.loaders.set(name, loader);
        return this.loaders.get(name);
    }
    /**
     * ### bud.build.getItem
     *
     * Get an item  from the store.
     */
    getItem(name) {
        return this.items.get(name);
    }
    /**
     * ### bud.build.setItem
     *
     * Set an item to the store. Returns the set item.
     */
    setItem(name, module) {
        this.items.set(name, Object.fromEntries(Object.entries(module)
            .map(([k, v]) => [k, this.app.access(v)])
            .map(([k, v]) => {
            if (k == 'loader') {
                return [k, this.loaders.get(v)];
            }
            return [k, v];
        })));
        return this.items.get(name);
    }
    /**
     * ### bud.build.getRule
     *
     * Get a rule from the store.
     */
    getRule(name) {
        return this.rules.get(name);
    }
    /**
     * ### bud.build.setRule
     *
     * Set a rule to the store. Returns the set rule.
     */
    setRule(name, module) {
        this.rules.set(name, Object.fromEntries(Object.entries(module).map(([k, v]) => [
            k,
            this.app.access(v),
        ])));
        return this.rules.get(name);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map