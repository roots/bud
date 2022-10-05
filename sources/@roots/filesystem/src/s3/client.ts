import {S3, S3ClientConfig} from '@aws-sdk/client-s3'

export default class Client {
  public static make(config: S3ClientConfig): S3 {
    return new S3(config)
  }
}
