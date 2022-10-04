/* eslint-disable no-console */
import {join} from 'node:path'

import {bind} from '@roots/bud-support/decorators'
import {readFile} from '@roots/bud-support/fs'
import {isUndefined} from '@roots/bud-support/lodash-es'
import AWS from 'aws-sdk'
import mime from 'mime-types'
import type {Compiler} from 'webpack'

import type {Options} from './options.interface'

/**
 * Upload assets to an S3 compatible provider
 *
 * @remarks
 * Based on {@link https://github.com/olsgreen/webpack-s3-pusher/blob/master/webpack.s3.pusher.js}
 *
 * @public
 */
export default class S3Plugin {
  /**
   * Assets
   *
   * @public
   */
  public assets: Array<[string, string]> = []

  public s3

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public options: Options) {
    if (isUndefined(this.options.region)) this.options.region = `us-west-2`
    if (
      !isUndefined(this.options.key) &&
      !isUndefined(this.options.secret)
    ) {
      const config = {
        accessKeyId: this.options.key,
        secretAccessKey: this.options.secret,
        region: `us-west-2`,
      }

      if (!isUndefined(this.options.region)) {
        Object.assign(config, {region: this.options.region})
      }

      if (!isUndefined(this.options.endpoint)) {
        Object.assign(config, {endpoint: this.options.endpoint})
      }

      AWS.config.update(config)
      this.s3 = new AWS.S3()
    }
  }

  /**
   * `apply` callback
   *
   *  @public
   */
  @bind
  public apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      `bud-s3-plugin`,
      (compilation, callback) => {
        this.assets = Array.from(Object.keys(compilation.assets))
          .map((filename: string): [string, string | false] => [
            filename,
            mime.lookup(filename),
          ])
          .filter(([filename, mimeType]) => mimeType !== false) as Array<
          [string, string]
        >

        callback()
      },
    )

    compiler.hooks.afterEmit.tapAsync(
      `bud-s3-plugin`,
      (_compilation, callback) => {
        ;(async () => {
          await Promise.all(
            this.assets.map(
              async ([filename, mimeType]: [string, string]) => {
                const local = join(compiler.outputPath, filename)
                const remote = !isUndefined(this.options.prefix)
                  ? join(this.options.prefix, filename)
                  : filename

                const contents = await readFile(local, `utf8`)

                try {
                  await this.upload(remote, contents, mimeType)
                } catch (error) {
                  console.error(`could not upload ${local} to ${remote}`)
                  console.error(error.name, error.message)
                  throw error
                }
              },
            ),
          ).then(() => callback())
        })()
      },
    )
  }

  /**
   * Upload asset to S3
   *
   * @public
   */
  @bind
  public async upload(Key: string, Body: string, ContentType: string) {
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Key,
          Body,
          ContentType,
          Bucket: this.options.bucket ?? `us-west-2`,
          ACL: this.options.acl ?? undefined,
          CacheControl: this.options.cache ?? undefined,
        },
        (error: Error, data: any) => {
          if (error) throw error
          // @ts-ignore
          resolve(data)
        },
      )
    })
  }
}
