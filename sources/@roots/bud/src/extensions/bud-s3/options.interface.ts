/**
 * S3 options
 *
 * @public
 */
export interface Options {
  /**
   * AWS access key
   * @public
   */
  key: string
  /**
   * AWS secret key
   * @public
   */
  secret: string
  /**
   * AWS bucket name
   * @public
   */
  bucket: string
  /**
   * If you are using Amazon S3 then only set region.
   * `region` and `endpoint` both should not be set together.
   * @public
   */
  region?: string
  /**
   * If you are using some other provider then set only endpoint.
   * `region` and `endpoint` both should not be set together.
   * @public
   */
  endpoint?: string
  /**
   * ACL for the uploaded files
   * @public
   */
  acl: string
  /**
   * Cache-Control header for the uploaded files
   * @public
   */
  cache: string
  /**
   * Prefix for the uploaded files
   * @public
   */
  prefix: string
  /**
   * If you want to upload only specific files
   * @public
   */
  include: string
  /**
   * If you want to exclude specific files
   * from uploading
   * @public
   */
  exclude: string
  /**
   * Remove files from the bucket before upload
   * @public
   */
  remove: Array<string>
}
