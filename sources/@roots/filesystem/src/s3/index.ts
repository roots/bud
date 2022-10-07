/* eslint-disable no-console */
import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectOutput,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import {bind} from 'helpful-decorators'
import isString from 'lodash-es/isString.js'
import isUndefined from 'lodash-es/isUndefined.js'
import mimetypes from 'mime-types'
import type {Readable} from 'stream'

import Client from './client.js'
import Config from './config.js'

/**
 * S3 API
 *
 * @public
 */
export default class S3 {
  /**
   * The S3 bucket name
   *
   * @public
   */
  public bucket: string

  /**
   * S3 config instance
   *
   * @public
   */
  public config: Config = new Config()

  /**
   * Permissions for uploaded files
   *
   * @public
   */
  public isPublic: boolean = true

  /**
   * Identifier (for loggers, etc)
   *
   * @public
   */
  public get ident() {
    const maybeEndpoint = this.getEndpoint()

    if (!maybeEndpoint) return `${this.getBucket()} (${this.getRegion()})`

    if (
      isString(maybeEndpoint) &&
      maybeEndpoint.includes(`digitaloceanspaces`)
    )
      return `https://${this.getBucket()}.${
        new URL(maybeEndpoint).hostname
      }`

    return `https://${maybeEndpoint.toString()}`
  }

  /**
   * S3 client instance
   *
   * @public
   */
  public get client(): S3Client {
    return Client.make(this.config.value)
  }

  /**
   * Get the bucket name
   *
   * @returns bucket - {@link S3.bucket}
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public getBucket() {
    return this.bucket
  }

  /**
   * Set the bucket name
   *
   * @param bucket - {@link S3.bucket}
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public setBucket(bucket: string) {
    this.bucket = bucket

    return this
  }

  /**
   * Get config credentials
   *
   * @returns S3 credentials {@link Config.credentials}
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public getCredentials() {
    return this.config.value.credentials
  }

  /**
   * Set config credentials
   *
   * @param credentials - {@link Config.credentials}
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public setCredentials(credentials: Config['value']['credentials']) {
    this.config.set(`credentials`, credentials)

    return this
  }

  /**
   * Get config endpoint
   *
   * @returns S3 endpoint {@link Config.endpoint}
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public getEndpoint() {
    return this.config.value.endpoint
  }

  /**
   * Set config endpoint
   *
   * @param endpoint - {@link Config.endpoint}
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public setEndpoint(endpoint: Config['value']['endpoint']) {
    this.config.set(`endpoint`, endpoint)

    return this
  }

  /**
   * Get config region
   *
   * @returns S3 region {@link Config.region}
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public getRegion() {
    return this.config.value.region
  }

  /**
   * Set config region
   *
   * @param region - {@link Config.region}
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public setRegion(region: Config['value']['region']) {
    this.config.set(`region`, region)

    return this
  }

  /**
   * Get default ACL
   *
   * @returns acl {@link S3.isPublic}
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public getPublic() {
    return this.isPublic
  }

  /**
   * Set default acl
   *
   * @param isPublic - {@link Config.isPublic}
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public setPublic(isPublic?: boolean) {
    this.isPublic = isUndefined(isPublic) ? true : isPublic

    return this
  }

  /**
   * Read a file from s3
   *
   * @remarks
   * By default the raw response will be buffered to `utf8` before being returned. This can be
   * disabled by setting `raw` to `true`.
   *
   * @param key - The file key
   * @param raw - Whether to return raw response
   * @returns The file contents
   * @throws Error - If the file does not exist
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public async read(
    key: string,
    raw = false,
  ): Promise<GetObjectOutput | string> {
    const streamToString = ({Body: stream}: {Body: Readable}) =>
      new Promise((resolve, reject) => {
        const chunks = []

        stream
          .on(`data`, chunk => chunks.push(chunk))
          .on(`error`, reject)
          .on(`end`, () => resolve(Buffer.concat(chunks).toString(`utf8`)))
      })

    try {
      const request = (await this.client.send(
        new GetObjectCommand({Bucket: this.bucket, Key: key}),
      )) as {Body: Readable}

      if (raw) return request

      return streamToString(request)
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete a file from s3
   *
   * @param key - The file key
   * @returns S3 instance {@link S3}
   * @throws Error - If the file does not exist
   * @throws Error - If the file could not be deleted
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public async delete(key: string) {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      )

      return this
    } catch (error) {
      throw error
    }
  }

  /**
   * Check if file exists in bucket
   *
   * @param key - The file key
   * @returns boolean
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public async exists(key: string) {
    try {
      const files = (await this.list()) as Array<string>
      return files.some(item => item === key)
    } catch (error) {
      return false
    }
  }

  /**
   * List all files in bucket
   *
   * @remarks
   * By default the {@link ListObjectsCommandOutput} will be mapped so that the returned value is an array of file keys.
   * This can be disabled by setting `raw` to `true`.
   *
   * @param raw - Whether to return {@link ListObjectsCommandOutput}
   * @returns Array of file keys
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public async list(raw = false) {
    try {
      const results = await this.client.send(
        new ListObjectsCommand({
          Bucket: this.bucket,
        }),
      )

      if (raw) return results
      else return results.Contents.map(({Key}) => Key)
    } catch (error) {
      throw error
    }
  }

  /**
   * Write a file to s3
   *
   * @param params - Either {@link PutObjectCommandInput} or the key and body
   * @returns S3 instance {@link S3}
   *
   * @public
   * @decorator bind - {@link bind}
   */
  @bind
  public async write(
    ...params:
      | [Omit<PutObjectCommandInput, `Bucket`>]
      | [string, Readable | ReadableStream | Blob | string]
  ) {
    const putProps = {
      Bucket: this.bucket,
      ACL: this.isPublic ? `public-read` : `private`,
      Key: null,
      ContentType: null,
    }

    if (typeof params[0] !== `string`) Object.assign(putProps, params[0])
    else Object.assign(putProps, {Key: params[0], Body: params[1]})

    if (!putProps.Key) throw new Error(`S3 write requires a key`)

    if (!putProps.ContentType) {
      const contentType = mimetypes.lookup(putProps.Key)
      if (!contentType) return

      putProps.ContentType = contentType
    }

    try {
      await this.client.send(new PutObjectCommand(putProps))

      return this
    } catch (error) {
      throw error
    }
  }
}
