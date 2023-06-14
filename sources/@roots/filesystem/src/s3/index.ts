import type {
  GetObjectOutput,
  ListObjectsCommandInput,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import type {Readable} from 'node:stream'

import SDK from '@roots/filesystem/vendor/sdk'
import {bind} from 'helpful-decorators'
import isString from 'lodash/isString.js'
import * as mimetypes from 'mime-types'

import {Client} from './client.js'
import {Config} from './config.js'

/**
 * S3 API
 */
export class S3 {
  /**
   * Client instance
   */
  public client: Client

  /**
   * S3 configuration
   */
  public config: Config

  /**
   * constructor
   */
  public constructor() {
    this.config = new Config()
    this.client = new Client()
  }

  /**
   * Delete a file from s3
   *
   * @param key - The file key
   * @returns S3 instance {@link S3}
   * @throws Error - If the file does not exist
   * @throws Error - If the file could not be deleted
   */
  @bind
  public async delete(key: string) {
    try {
      const client = this.getClient()
      const DeleteObjectOutput = new SDK.DeleteObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
      })
      // @ts-ignore
      await client.send(DeleteObjectOutput)

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
   * S3 Client
   */
  @bind
  public getClient(): S3Client {
    if (!this.config.credentials) {
      throw new Error(
        `S3 credentials are required. Did you forget to set them?`,
      )
    }

    return this.client.make({
      credentials: this.config.credentials,
      region: this.config.region,
      ...(this.config.endpoint ? {endpoint: this.config.endpoint} : {}),
    })
  }

  /**
   * Identifier (for loggers, etc)
   */
  public get ident() {
    const maybeEndpoint = this.config.get(`endpoint`)

    if (!maybeEndpoint)
      return `${this.config.get(`bucket`)} (${this.config.get(`region`)})`

    if (
      isString(maybeEndpoint) &&
      maybeEndpoint.includes(`digitaloceanspaces`)
    )
      return `https://${this.config.get(`bucket`)}.${
        new URL(maybeEndpoint).hostname
      }`

    return `https://${maybeEndpoint.toString()}`
  }

  /**
   * List all files in bucket
   *
   * @remarks
   * By default the {@link ListObjectsCommandOutput} will be mapped so that the returned value is an array of file keys.
   * This can be disabled by setting `raw` to `true`.
   *
   * @param props - {@link Omit<ListObjectsCommandInput, `Bucket`> command input props}
   * @returns Array of file keys
   */
  @bind
  public async list(
    props?: Omit<ListObjectsCommandInput, `Bucket`>,
  ): Promise<Array<string>> {
    try {
      const results = await this.getClient().send(
        // @ts-ignore
        new SDK.ListObjectsCommand({
          Bucket: this.config.bucket,
          ...(props ?? {}),
        }),
      )
      // @ts-ignore
      return results?.Contents.map(({Key}) => Key)
    } catch (error) {
      throw error
    }
  }

  /**
   * Read a file from s3
   *
   * @remarks
   * By default the raw response will be transformed to `utf8` before being returned.
   * This can be disabled by setting `raw` to `true`.
   *
   * @param key - The file key
   * @param raw - Whether to return raw response
   * @returns The file contents
   * @throws Error - If the file does not exist
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

    const client = this.getClient()

    const GetObjectCommandOutput = new SDK.GetObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
    })

    try {
      // @ts-ignore
      const request = (await client.send(GetObjectCommandOutput)) as {
        Body: Readable
      }

      return raw ? request : streamToString(request)
    } catch (error) {
      throw error
    }
  }

  /**
   * Write a file to s3
   *
   * @param params - Either {@link PutObjectCommandInput} or the key and body
   * @returns S3 instance {@link S3}
   */
  @bind
  public async write(
    ...params:
      | [Omit<PutObjectCommandInput, `Bucket`>]
      | [string, Blob | Readable | ReadableStream | string]
  ) {
    const putProps = {
      ACL: this.config.public ? `public-read` : `private`,
      Bucket: this.config.bucket,
      ContentType: null,
      Key: null,
    }

    if (typeof params[0] !== `string`) Object.assign(putProps, params[0])
    else Object.assign(putProps, {Body: params[1], Key: params[0]})

    if (!putProps.Key) throw new Error(`S3 write requires a key`)

    if (!putProps.ContentType) {
      const contentType = mimetypes.lookup(putProps.Key)
      if (!contentType) return

      putProps.ContentType = contentType
    }

    try {
      const client = this.getClient()
      await client.send(
        // @ts-ignore
        new SDK.PutObjectCommand(putProps),
      )

      return this
    } catch (error) {
      throw error
    }
  }
}
