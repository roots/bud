import type {S3Client, S3ClientConfig} from '@aws-sdk/client-s3'

import SDK from '@roots/filesystem/vendor/sdk'

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
  public make(config: S3ClientConfig): S3Client {
    return new SDK.S3Client(config) as S3Client
  }
}
