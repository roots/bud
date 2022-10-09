import FS, {json, S3, yml} from '@roots/bud-support/filesystem'
import globby from '@roots/bud-support/globby'
import {isUndefined} from '@roots/bud-support/lodash-es'
import {join} from 'path'

import type {Bud} from '../bud'

/**
 * Filesystem service
 *
 * @public
 */
export default class Service extends FS {
  /**
   * Service label
   *
   * @public
   */
  public static label = `fs`

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
  public s3: S3

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
  public constructor(public app?: Bud) {
    super(app.context.basedir)
    this.s3 = new S3()
    this.logger = this.app.logger
      .makeInstance({logLevel: `info`, interactive: true})
      .scope(...this.app.logger.scope, `fs`)

    this.app.json = this.json
    this.app.yml = this.yml
  }

  /**
   * Set bucket
   *
   * @param bucket - {@link S3.bucket}
   * @public
   */
  public setBucket: S3[`setBucket`] = function (bucket: string) {
    this.s3.setBucket(bucket)

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
    this.s3.setCredentials(credentials)

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
    this.s3.setEndpoint(endpoint)
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
    this.s3.setRegion(region)
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
  }): Service {
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

    this.app.after(async () => {
      await globby(files, {cwd: source}).then(async files => {
        const descriptions = await Promise.all(
          files.map(async file => {
            const contents = await this.read(join(source, file), `buffer`)
            return {file, contents}
          }),
        )

        const manifestExists = await this.s3.exists(
          s3Path(`upload-manifest.json`),
        )
        const entries = Object.entries(
          manifestExists
            ? await this.s3
                .read(s3Path(`upload-manifest.json`))
                .then(this.json.parse)
            : {},
        )

        await Promise.all(
          descriptions.map(async ({file, contents}) => {
            this.logger.await(`Upload ${file} to ${this.s3.ident}`)

            try {
              await this.s3.write(s3Path(file), contents)
              this.logger.success(`Upload ${file} to ${this.s3.ident}`)
            } catch (error) {
              this.logger.error(`Upload ${file} to ${this.s3.ident}`)
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
              const fileExists = await this.s3.exists(key)
              if (!fileExists) return

              this.logger.await(
                `Remove ${key} from ${this.s3.ident} (stale)`,
              )
              await this.s3.delete(key)
              this.logger.success(
                `Remove ${key} from ${this.s3.ident} (stale)`,
              )
            }),
        )

        this.logger.await(`Write upload-manifest.json to ${this.s3.ident}`)
        await this.s3.write({
          Key: s3Path(`upload-manifest.json`),
          Body: Buffer.from(
            this.json.stringify({
              ...entries.reduce((acc, [k, v]) => ({...acc, [k]: v}), {}),
              [new Date().getTime()]: descriptions.map(({file}) => file),
            }),
          ),
        })
        this.logger.success(
          `Write upload-manifest.json to ${this.s3.ident}`,
        )
      })
    })

    return this
  }
}
