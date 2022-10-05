import type {S3ClientConfig} from '@aws-sdk/client-s3'

export default class Config {
  public credentials: S3ClientConfig[`credentials`]

  public region: S3ClientConfig[`region`] = `us-east-1`

  public endpoint: S3ClientConfig[`endpoint`]

  public get value(): S3ClientConfig {
    if (!this.credentials) {
      throw new Error(
        `S3 credentials are required. Did you forget to set them?`,
      )
    }

    let value: S3ClientConfig = {
      credentials: this.credentials,
      region: this.region,
    }

    if (this.endpoint) value.endpoint = this.endpoint

    return value
  }

  public get<K extends `${keyof S3ClientConfig & keyof Config & string}`>(
    key: K,
  ): this[K] {
    return this[key]
  }

  public set<K extends `${keyof S3ClientConfig & keyof Config & string}`>(
    key: K,
    value: this[K],
  ): void {
    this[key] = value
  }
}
