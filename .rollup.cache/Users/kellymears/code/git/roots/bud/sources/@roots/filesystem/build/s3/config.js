/**
 * S3 config
 */
export class Config {
    constructor() {
        /**
         * S3 region
         */
        this.region = `us-east-1`;
        /**
         * Treat bucket contents as public
         */
        this.public = true;
    }
    /**
     * Get a config value
     *
     * @param key - {@link S3ClientConfig} key
     * @returns value - {@link S3ClientConfig} value
     */
    get(key) {
        return this[key];
    }
    /**
     * Set a config value
     *
     * @param key - {@link S3ClientConfig} key
     * @param value - {@link S3ClientConfig} value
     * @returns void
     */
    set(key, value) {
        this[key] = value;
    }
}
//# sourceMappingURL=config.js.map