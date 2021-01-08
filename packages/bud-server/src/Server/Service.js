"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bud_support_1 = require("@roots/bud-support");
/**
 * ## Server service provider.
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 */
class default_1 extends bud_support_1.Service {
    get instance() {
        return this._instance;
    }
    set instance(server) {
        this._instance = server;
    }
    get running() {
        return this._running;
    }
    set running(running) {
        this._running = running;
    }
    get config() {
        return this.app.makeContainer(this.app.store.get('server'));
    }
}
exports.default = default_1;
//# sourceMappingURL=Service.js.map