import { S3 } from '@aws-sdk/client-s3';
/**
 * S3 client
 */
export class Client {
    /**
     * Make a new client
     *
     * @param config - {@link S3ClientConfig}
     * @returns {@link S3Client}
     */
    async make(config) {
        return new S3(config);
    }
}
//# sourceMappingURL=client.js.map