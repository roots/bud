import {S3, S3Client, S3ClientConfig} from '@aws-sdk/client-s3'

export default class Client {
  public static make(config: S3ClientConfig): S3Client {
    return new S3(config)
  }
}
