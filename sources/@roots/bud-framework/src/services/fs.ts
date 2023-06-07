import {join} from 'node:path'

import {bind} from '@roots/bud-support/decorators/bind'
import {Filesystem, json, yml} from '@roots/bud-support/filesystem'
import globby from '@roots/bud-support/globby'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import logger from '@roots/bud-support/logger'
import {type S3} from '@roots/filesystem/s3'

import type {Bud} from '../bud.js'
import type {Contract} from '../service.js'

/**
 * {@link Filesystem} service
 */
export default class FS extends Filesystem implements Contract {
  /**
   * {@link Contract.label}
   */
  public label = `fs`

  /**
   * {@link Contract.app}
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * {@link Contract.logger}
   */
  public get logger(): typeof logger {
    return logger.scope(`fs`)
  }

  /**
   * JSON
   *
   * @see {@link https://bud.js.org/docs/bud.fs/json}
   */
  public json: typeof json = json

  /**
   * @see {@link https://bud.js.org/docs/bud.fs/yml}
   */
  public yml: typeof yml = yml

  /**
   * S3
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3}
   */
  public s3?: S3

  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    super(_app().context.basedir)
  }

  /**
   * {@link Contract.bootstrap}
   */
  public async register(bud: Bud) {
    try {
      const {S3} = await import(`@roots/filesystem/s3`)
      this.s3 = new S3()
    } catch (error) {
      // fallthrough
    }
  }

  /**
   * Fulfills {@link Contract.bootstrap}
   */
  public async bootstrap() {}

  /**
   * Fulfills {@link Contract.boot}
   */
  public async boot() {}

  /**
   * Set bucket
   *
   * @param bucket - {@link S3.bucket}
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3#setup}
   */
  public setBucket(bucket: string) {
    if (!this.s3) this.throwS3Error()

    this.app.after(async (bud: Bud) => {
      bud.fs.s3.config.set(`bucket`, bucket)
    })

    return this
  }

  /**
   * Set credentials
   *
   * @param credentials - {@link S3.credentials}
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3#setup}
   */
  public setCredentials(credentials: S3[`config`][`credentials`]) {
    if (!this.s3) this.throwS3Error()

    this.app.after(async (bud: Bud) => {
      bud.fs.s3.config.set(`credentials`, credentials)
    })

    return this
  }

  /**
   * Set endpoint
   *
   * @param endpoint - S3 endpoint
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3#setup}
   */
  public setEndpoint(endpoint: S3[`config`][`endpoint`]) {
    if (!this.s3) this.throwS3Error()

    this.app.after(async (bud: Bud) => {
      bud.fs.s3.config.set(`endpoint`, endpoint)
    })

    return this
  }

  /**
   * Set S3 region
   *
   * @param region - S3 region
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3#setup}
   */
  public setRegion(region: S3[`config`][`region`]) {
    if (!this.s3) this.throwS3Error()

    this.app.after(async (bud: Bud) => {
      bud.fs.s3.config.set(`region`, region)
    })

    return this
  }

  /**
   * Upload files to S3
   *
   * @param options - upload options
   *
   * @see {@link https://bud.js.org/docs/bud.fs/s3#uploading-files}
   */
  public upload(options?: {
    source?: string
    destination?: string
    files?: string
    keep?: number | false
  }): this {
    if (!this.s3) this.throwS3Error()

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

  /**
   * Throw S3 error
   */
  @bind
  public throwS3Error() {
    const dependencies = {
      ...(this.app.context.files?.[`package.json`]?.module?.dependencies ??
        {}),
      ...(this.app.context.files?.[`package.json`]?.module
        ?.devDependencies ?? {}),
    }
    if (!Object.keys(dependencies)?.includes(`@aws-sdk/client-s3`)) {
      throw new Error(
        `S3 is not available. Please install @aws-sdk/client-s3 to use this feature.`,
      )
    }
    throw new Error(`S3 is not available.`)
  }
}
