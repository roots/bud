import {join} from 'node:path'

import {FS, json, yml} from '@roots/bud-support/filesystem'
import globby from '@roots/bud-support/globby'
import {isUndefined} from '@roots/bud-support/lodash-es'
import type S3 from '@roots/filesystem/s3'

import type {Bud} from '../bud.js'

/**
 * Filesystem service
 *
 * @public
 */
export default class FileSystem extends FS {
  /**
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger
   *
   * @public
   */
  public logger: Bud['logger']['instance']

  /**
   * JSON handling
   *
   * @public
   */
  public json: typeof json = json

  /**
   * S3 instance
   *
   * @public
   */
  public s3?: S3

  /**
   * YML handling
   *
   * @public
   */
  public yml: typeof yml = yml

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Bud) {
    super(_app().context.basedir)

    this.logger = this.app.logger
      .makeInstance({logLevel: `info`, interactive: true})
      .scope(...this.app.logger.scope, `fs`)

    Object.assign(this.app, {
      json: this.json,
      yml: this.yml,
    })
  }

  /**
   * Set bucket
   *
   * @param bucket - {@link S3.bucket}
   * @public
   */
  public setBucket: S3[`setBucket`] = function (bucket: string) {
    this.app.after(async (bud: Bud) => {
      if (!bud.fs.s3)
        bud.fs.s3 = await import(`@roots/filesystem/s3`).then(
          ({default: s3}) => new s3(),
        )

      bud.fs.s3.setBucket(bucket)
    })

    return this
  }

  /**
   * Set credentials
   *
   * @param credentials - {@link S3.credentials}
   * @public
   */
  public setCredentials: S3[`setCredentials`] = function (
    credentials: S3[`config`][`credentials`],
  ) {
    this.app.after(async (bud: Bud) => {
      if (!bud.fs.s3)
        bud.fs.s3 = await import(`@roots/filesystem/s3`).then(
          ({default: s3}) => new s3(),
        )

      bud.fs.s3.setCredentials(credentials)
    })

    return this
  }

  /**
   * Set endpoint
   *
   * @param options - upload options
   * @public
   */
  public setEndpoint: S3[`setEndpoint`] = function (
    endpoint: S3[`config`][`endpoint`],
  ) {
    this.app.after(async (bud: Bud) => {
      if (!bud.fs.s3)
        bud.fs.s3 = await import(`@roots/filesystem/s3`).then(
          ({default: s3}) => new s3(),
        )

      bud.fs.s3.setEndpoint(endpoint)
    })

    return this
  }

  /**
   * Set S3 region
   *
   * @param options - upload options
   * @public
   */
  public setRegion: S3[`setRegion`] = function (
    region: S3[`config`][`region`],
  ) {
    this.app.after(async (bud: Bud) => {
      if (!bud.fs.s3)
        bud.fs.s3 = await import(`@roots/filesystem/s3`).then(
          ({default: s3}) => new s3(),
        )

      bud.fs.s3.setRegion(region)
    })

    return this
  }

  /**
   * Upload files to S3
   *
   * @param options - upload options
   * @public
   */
  public upload(options?: {
    source?: string
    destination?: string
    files?: string
    keep?: number | false
  }): this {
    const {source, files, keep, destination} = {
      source: isUndefined(options?.source)
        ? this.app.path(`@dist`)
        : options.source,
      files: isUndefined(options?.files) ? `**/*` : options.files,
      keep: isUndefined(options?.keep) ? 5 : options.keep,
      destination: options?.destination,
    }

    const s3Path = (path: string) =>
      destination ? join(destination, path) : path

    this.app.after(async (bud: Bud) => {
      if (!bud.fs.s3)
        bud.fs.s3 = await import(`@roots/filesystem/s3`).then(
          ({default: s3}) => new s3(),
        )

      await globby(files, {cwd: source}).then(async files => {
        const descriptions = await Promise.all(
          files.map(async file => {
            const contents = await bud.fs.read(
              join(source, file),
              `buffer`,
            )
            return {file, contents}
          }),
        )

        const manifestExists = await bud.fs.s3.exists(
          s3Path(`upload-manifest.json`),
        )
        const entries = Object.entries(
          manifestExists
            ? await bud.fs.s3
                .read(s3Path(`upload-manifest.json`))
                .then(bud.fs.json.parse)
            : {},
        )

        await Promise.all(
          descriptions.map(async ({file, contents}) => {
            bud.fs.logger.await(`Upload ${file} to ${bud.fs.s3.ident}`)

            try {
              await bud.fs.s3.write(s3Path(file), contents)
              bud.fs.logger.success(`Upload ${file} to ${bud.fs.s3.ident}`)
            } catch (error) {
              bud.fs.logger.error(`Upload ${file} to ${bud.fs.s3.ident}`)
              throw error
            }
          }),
        )

        if (typeof keep !== `number`) return

        const stale =
          keep > 1 ? entries.splice(0, entries.length - (keep - 1)) : []

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
              const fileExists = await bud.fs.s3.exists(key)
              if (!fileExists) return

              bud.fs.logger.await(
                `Remove ${key} from ${bud.fs.s3.ident} (stale)`,
              )
              await bud.fs.s3.delete(key)
              bud.fs.logger.success(
                `Remove ${key} from ${bud.fs.s3.ident} (stale)`,
              )
            }),
        )

        bud.fs.logger.await(
          `Write upload-manifest.json to ${bud.fs.s3.ident}`,
        )

        await bud.fs.s3.write({
          Key: s3Path(`upload-manifest.json`),
          Body: Buffer.from(
            bud.fs.json.stringify({
              ...entries.reduce((acc, [k, v]) => ({...acc, [k]: v}), {}),
              [new Date().getTime()]: descriptions.map(({file}) => file),
            }),
          ),
        })

        bud.fs.logger.success(
          `Write upload-manifest.json to ${bud.fs.s3.ident}`,
        )
      })
    })

    return this
  }
}
