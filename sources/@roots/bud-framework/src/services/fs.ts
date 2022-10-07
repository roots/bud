import FS, {S3} from '@roots/bud-support/filesystem'

import type {Bud} from '../bud'

export default class Service extends FS {
  public static label = `fs`

  public s3: S3

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app?: Bud) {
    super()
    this.s3 = new S3()
  }

  public upload(options?: {
    source?: string
    destination?: string
    files?: string
    keep?: number | false
  }) {
    this.app.after(async app => {
      if (!options)
        options = {
          source: app.path(`@dist`),
          files: `**/*`,
          keep: 5,
        }

      if (!options?.source) options.source = app.path(`@dist`)

      await app.fs.s3.upload(
        options as {
          source: string
          keep?: number | false
          files?: string
          destination?: string
        },
      )
    })
  }
}
