import type {S3ClientConfig} from '@aws-sdk/client-s3'

/**
 * S3 config
 *
 * @public
 */
export default class Config {
  /**
   * S3 credentials
   *
   * @public
   */
  public credentials: S3ClientConfig[`credentials`]

  /**
   * S3 region
   *
   * @public
   */
  public region: S3ClientConfig[`region`] = `us-east-1`

  /**
   * S3 endpoint
   *
   * @public
   */
  public endpoint: S3ClientConfig[`endpoint`]

  /**
   * Get a config value
   *
   * @param key - {@link S3ClientConfig} key
   * @returns value - {@link S3ClientConfig} value
   * @public
   */
  public get<K extends `${keyof S3ClientConfig & keyof Config & string}`>(
    key: K,
  ): this[K] {
    return this[key]
  }

  /**
   * Set a config value
   *
   * @param key - {@link S3ClientConfig} key
   * @param value - {@link S3ClientConfig} value
   * @returns void
   * @public
   */
  public set<K extends `${keyof S3ClientConfig & keyof Config & string}`>(
    key: K,
    value: this[K],
  ): void {
    this[key] = value
  }
}
