import type {S3Client, S3ClientConfig} from '@aws-sdk/client-s3'

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
  public async make(config: S3ClientConfig): Promise<S3Client> {
    return await import(`@aws-sdk/client-s3`).then(
      ({S3}) => new S3(config),
    )
  }
}
