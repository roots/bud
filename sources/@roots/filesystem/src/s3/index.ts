/* eslint-disable no-console */
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
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

export default class S3 {
  public bucket: string

  public config: Config = new Config()

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

    if (maybeEndpoint) {
      return `https://${maybeEndpoint.toString()}`
    }
  }

  public get client(): S3Client {
    return Client.make(this.config.value)
  }

  public getBucket() {
    return this.bucket
  }
  @bind
  public setBucket(bucket: string) {
    this.bucket = bucket
    return this
  }

  public getCredentials() {
    return this.config.value.credentials
  }

  @bind
  public setCredentials(credentials: Config['value']['credentials']) {
    this.config.set(`credentials`, credentials)
    return this
  }

  public getEndpoint() {
    return this.config.value.endpoint
  }

  @bind
  public setEndpoint(endpoint: Config['value']['endpoint']) {
    this.config.set(`endpoint`, endpoint)
    return this
  }

  public getRegion() {
    return this.config.value.region
  }

  @bind
  public setRegion(region: Config['value']['region']) {
    this.config.set(`region`, region)
    return this
  }

  public isPublic: boolean = true

  @bind
  public setPublic(isPublic?: boolean) {
    this.isPublic = isUndefined(isPublic) ? true : isPublic
  }
  public getPublic() {
    return this.isPublic
  }

  public async read(key: string): Promise<any> {
    const streamToString = ({Body: stream}: {Body: Readable}) =>
      new Promise((resolve, reject) => {
        const chunks = []

        stream
          .on(`data`, chunk => chunks.push(chunk))
          .on(`error`, reject)
          .on(`end`, () => resolve(Buffer.concat(chunks).toString(`utf8`)))
      })

    try {
      return await this.client
        .send(
          new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
          }),
        )
        .then(streamToString as any)
    } catch (error) {
      throw error
    }
  }

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

  public async exists(key: string) {
    try {
      return (await this.list()).some(item => item === key)
    } catch (error) {
      return false
    }
  }

  public async list() {
    try {
      const results = await this.client.send(
        new ListObjectsCommand({
          Bucket: this.bucket,
        }),
      )

      if (results) return results.Contents.map(({Key}) => Key)
    } catch (error) {
      throw error
    }
  }

  public async write(params: Omit<PutObjectCommandInput, `Bucket`>) {
    if (!params.Key) throw new Error(`S3 write requires a key`)

    if (!params.ContentType) {
      const contentType = mimetypes.lookup(params.Key)
      if (!contentType) return

      params.ContentType = contentType
    }

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          ACL: this.isPublic ? `public-read` : `private`,
          ...params,
        }),
      )

      return this
    } catch (error) {
      throw error
    }
  }
}
