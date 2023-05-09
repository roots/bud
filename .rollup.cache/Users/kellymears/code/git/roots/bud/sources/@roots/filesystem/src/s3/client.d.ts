import type { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
/**
 * S3 client
 */
export declare class Client {
    /**
     * Make a new client
     *
     * @param config - {@link S3ClientConfig}
     * @returns {@link S3Client}
     */
    make(config: S3ClientConfig): Promise<S3Client>;
}
//# sourceMappingURL=client.d.ts.map