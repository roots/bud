"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bud_support_1 = require("@roots/bud-support");
const Extension_1 = __importDefault(require("./Extension"));
const Service_1 = __importDefault(require("./Service"));
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
class default_1 extends Service_1.default {
    /**
     * Service register
     */
    register() {
        this.setStore(this.extensions);
    }
    /**
     * Service boot
     */
    boot() {
        this.getEntries().map(([name, ext]) => {
            this.set(name, ext);
        });
    }
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
    set(name, extension) {
        bud_support_1.set(this.repository, name, new Extension_1.default({
            app: this.app,
            extension,
        }).init());
        return this;
    }
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
    use(pkg) {
        const path = require.resolve(pkg);
        this.app.disk.set(pkg, {
            base: this.app.disk.path.dirname(path),
            glob: ['**/*'],
        });
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.set(pkg, require(path));
        return this;
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map