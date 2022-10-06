/* eslint-disable no-console */
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import fs from 'fs-jetpack'
import {globby} from 'globby'
import isUndefined from 'lodash-es/isUndefined.js'
import mimetypes from 'mime-types'
import {join} from 'path'
import type {Readable} from 'stream'

import * as json from '../json.js'
import Client from './client.js'
import Config from './config.js'

export default class S3 {
  public bucket: string

  public config: Config = new Config()

  public get client(): S3Client {
    return Client.make(this.config.value)
  }

  public getBucket() {
    return this.bucket
  }
  public setBucket(bucket: string) {
    this.bucket = bucket
    return this
  }

  public getCredentials() {
    return this.config.value.credentials
  }
  public setCredentials(credentials: Config['value']['credentials']) {
    this.config.set(`credentials`, credentials)
    return this
  }

  public getEndpoint() {
    return this.config.value.endpoint
  }
  public setEndpoint(endpoint: Config['value']['endpoint']) {
    this.config.set(`endpoint`, endpoint)
    return this
  }

  public getRegion() {
    return this.config.value.region
  }
  public setRegion(region: Config['value']['region']) {
    this.config.set(`region`, region)
    return this
  }

  public isPublic: boolean = true
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

        stream.on(`data`, chunk => chunks.push(chunk))
        stream.on(`error`, reject)
        stream.on(`end`, () =>
          resolve(Buffer.concat(chunks).toString(`utf8`)),
        )
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

  public async upload({
    source,
    destination,
    files = `**/*`,
    keep = 5,
  }: {
    source: string
    destination?: string
    files?: string
    keep: number | false
  }) {
    await globby(files, {cwd: source}).then(async files => {
      const descriptions = await Promise.all(
        files.map(async file => {
          const destinationPath = destination
            ? join(destination, file)
            : file

          const contents = await fs.read(join(source, file), `buffer`)

          return {
            file,
            destinationPath,
            contents,
          }
        }),
      )

      const manifestPath = destination
        ? join(destination, `upload-manifest.json`)
        : `upload-manifest.json`

      const manifestExists = await this.exists(manifestPath)
      const entries = Object.entries(
        manifestExists
          ? await this.read(manifestPath).then(JSON.parse)
          : {},
      )

      const shouldPrune = typeof keep === `number`
      const stale =
        shouldPrune && keep > 1
          ? entries.splice(0, entries.length - (keep - 1))
          : []

      await Promise.all(
        [...new Set(stale)]
          .flatMap(([key, value]: [string, Array<string>]) => value)
          .filter(
            key =>
              !entries.some(([_, value]: [string, Array<string>]) =>
                value.includes(key),
              ),
          )
          .map(async key => {
            const fileExists = await this.exists(key)
            if (!fileExists) return
            await this.delete(key)
          }),
      )

      await Promise.all(
        descriptions.map(async ({file, destinationPath, contents}) => {
          await this.write({Key: destinationPath, Body: contents})
          console.log(`Uploaded ${file} to ${this.bucket}`)
          return file
        }),
      ).then(files => files.filter(Boolean))

      if (shouldPrune) {
        const merged = {
          ...entries.reduce((acc, [k, v]) => ({...acc, [k]: v}), {}),
          [new Date().getTime()]: descriptions.map(({file}) => file),
        }

        await this.write({
          Key: manifestPath,
          Body: Buffer.from(json.stringify(merged)),
        })
      }
    })
  }
}
