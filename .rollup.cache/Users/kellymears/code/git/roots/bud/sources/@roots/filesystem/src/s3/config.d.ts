import type { S3ClientConfig } from '@aws-sdk/client-s3';
/**
 * S3 config
 */
export declare class Config {
    /**
     * S3 credentials
     */
    credentials: S3ClientConfig[`credentials`];
    /**
     * S3 region
     */
    region: S3ClientConfig[`region`];
    /**
     * S3 endpoint
     */
    endpoint: S3ClientConfig[`endpoint`];
    /**
     * S3 bucket
     */
    bucket: string;
    /**
     * Treat bucket contents as public
     */
    public: boolean;
    /**
     * Get a config value
     *
     * @param key - {@link S3ClientConfig} key
     * @returns value - {@link S3ClientConfig} value
     */
    get<K extends `${(keyof S3ClientConfig & keyof Config & string) | (keyof Config & string)}`>(key: K): this[K];
    /**
     * Set a config value
     *
     * @param key - {@link S3ClientConfig} key
     * @param value - {@link S3ClientConfig} value
     * @returns void
     */
    set<K extends `${(keyof S3ClientConfig & keyof Config & string) | (keyof Config & string)}`>(key: K, value: this[K]): void;
}
//# sourceMappingURL=config.d.ts.map