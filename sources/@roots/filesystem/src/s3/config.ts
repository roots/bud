import type {S3ClientConfig} from '@aws-sdk/client-s3'

/**
 * S3 config
 */
export class Config {
  /**
   * S3 credentials
   */
  public credentials: S3ClientConfig[`credentials`]

  /**
   * S3 region
   */
  public region: S3ClientConfig[`region`] = `us-east-1`

  /**
   * S3 endpoint
   */
  public endpoint: S3ClientConfig[`endpoint`]

  /**
   * S3 bucket
   */
  public bucket: string

  /**
   * Treat bucket contents as public
   */
  public public: boolean = true

  /**
   * Get a config value
   *
   * @param key - {@link S3ClientConfig} key
   * @returns value - {@link S3ClientConfig} value
   */
  public get<
    K extends `${
      | (keyof S3ClientConfig & keyof Config & string)
      | (keyof Config & string)}`,
  >(key: K): this[K] {
    return this[key]
  }

  /**
   * Set a config value
   *
   * @param key - {@link S3ClientConfig} key
   * @param value - {@link S3ClientConfig} value
   * @returns void
   */
  public set<
    K extends `${
      | (keyof S3ClientConfig & keyof Config & string)
      | (keyof Config & string)}`,
  >(key: K, value: this[K]): void {
    this[key] = value
  }
}
