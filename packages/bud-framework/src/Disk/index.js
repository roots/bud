"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filesystem_1 = require("@roots/filesystem");
const bud_support_1 = require("@roots/bud-support");
class default_1 extends filesystem_1.FileSystem {
    /**
     * Constructor
     */
    constructor(items) {
        super();
        /**
         * Has prop?
         */
        this.hasProp = function (name) {
            return bud_support_1.has(this, name);
        };
        this._app = items.app.get;
        try {
            this.app
                .makeContainer(items.containers.disks)
                .every((name, options) => {
                this.make(name, Object.assign({ glob: ['**/*', '*'], baseDir: process.cwd() }, options));
            });
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    /**
     * Register service
     */
    register() {
        return;
    }
    /**
     * Boot service
     */
    boot() {
        return;
    }
    /**
     * Application
     */
    get app() {
        return this._app();
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map