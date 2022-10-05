import * as FS from '@roots/bud-support/filesystem'

import type {Bud} from '../bud'
import * as BaseService from '../service.js'

export default class Service extends BaseService.Service {
  public static label = `fs`

  public s3: FS.S3

  public read = FS.read

  public write = FS.write

  public find = FS.find

  public list = FS.list

  public json = FS.json

  public yml = FS.yml

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    super(app)
    this.s3 = new FS.S3()
  }

  public upload({
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
    this.app.after(async app => {
      if (!source) source = this.app.path(`@dist`)
      await this.s3.upload({source, destination, files, keep})
    })
  }
}
