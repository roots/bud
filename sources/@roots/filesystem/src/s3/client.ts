import {S3, S3Client, S3ClientConfig} from '@aws-sdk/client-s3'

/**
 * S3 client
 *
 * @public
 */
export default class Client {
  /**
   * Make a new client
   *
   * @param config - {@link S3ClientConfig}
   * @returns {@link S3Client}
   *
   * @public
   */
  public static make(config: S3ClientConfig): S3Client {
    return new S3(config)
  }
}
