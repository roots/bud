import {Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'

import type {Options} from './options.interface'
import S3Plugin from './plugin.js'

/**
 * Upload assets to an S3 compatible provider
 *
 * @example
 * ```js
 * bud.s3
 *  .setKey(`key`)
 *  .setSecret(`secret`)
 *  .setBucket(`bucket`)
 *  .setEndpoint(`https://sgp1.digitaloceanspaces.com`)
 *  .setAcl(`public-read`)
 *  .setCache(`max-age=602430`)
 *  .enable()
 * ```
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 * @decorator `@plugin`
 * @decorator `@expose`
 */
@label(`bud-s3`)
@options<Options>({
  key: app =>
    app.env.has(`S3_KEY`) && app.env.isString(`S3_KEY`)
      ? app.env.get(`S3_KEY`)
      : undefined,
  secret: app =>
    app.env.has(`S3_SECRET`) && app.env.isString(`S3_SECRET`)
      ? app.env.get(`S3_SECRET`)
      : undefined,
  region: app =>
    app.env.has(`S3_REGION`) && app.env.isString(`S3_REGION`)
      ? app.env.get(`S3_REGION`)
      : undefined,
  endpoint: app =>
    app.env.has(`S3_ENDPOINT`) && app.env.isString(`S3_ENDPOINT`)
      ? app.env.get(`S3_ENDPOINT`)
      : undefined,
  bucket: app =>
    app.env.has(`S3_BUCKET`) && app.env.isString(`S3_BUCKET`)
      ? app.env.get(`S3_BUCKET`)
      : undefined,
  acl: `public-read`,
  cache: `max-age=602430`,
  prefix: app =>
    app.env.has(`S3_PREFIX`) && app.env.isString(`S3_PREFIX`)
      ? app.env.get(`S3_PREFIX`)
      : undefined,
  include: null,
  exclude: null,
  remove: [],
})
@plugin(S3Plugin)
@expose(`s3`)
@when(async app => false)
export default class BudS3 extends Extension<Options, S3Plugin> {
  /**
   * Set S3 key
   *
   * @remarks
   * Can also use the `S3_KEY` environment variable.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setKey(key: string) {
    this.setOption(`key`, key)
    return this
  }

  /**
   * Set S3 secret
   *
   * @remarks
   * Can also use the `S3_SECRET` environment variable.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setSecret(secret: string) {
    this.setOption(`secret`, secret)
    return this
  }

  /**
   * Set S3 bucket
   *
   * @remarks
   * Can also use the `S3_BUCKET` environment variable.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setBucket(bucket: string) {
    this.setOption(`bucket`, bucket)
    return this
  }

  /**
   * If you are using Amazon S3 then only set region.
   *
   * @remarks
   * Can also use the `S3_REGION` environment variable.
   * `region` and `endpoint` shouldn't bet used together.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRegion(region: string) {
    this.setOption(`region`, region)
    return this
  }

  /**
   * Set S3 endpoint
   *
   * @remarks
   * Can also use the `S3_ENDPOINT` environment variable.
   * `region` and `endpoint` shouldn't bet used together.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setEndpoint(endpoint: string) {
    this.setOption(`endpoint`, endpoint)
    return this
  }

  /**
   * Set ACL
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setAcl(acl: string) {
    this.setOption(`acl`, acl)
    return this
  }

  /**
   * Set cache
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setCache(cache: string) {
    this.setOption(`cache`, cache)
    return this
  }

  /**
   * Set prefix
   *
   * @remarks
   * Can also use the `S3_PREFIX` environment variable.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPrefix(prefix: string) {
    this.setOption(`prefix`, prefix)
    return this
  }

  /**
   * Set include
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setInclude(include: string) {
    this.setOption(`include`, include)
    return this
  }

  /**
   * Set exclude
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setExclude(exclude: string) {
    this.setOption(`exclude`, exclude)
    return this
  }

  /**
   * Set remove
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRemove(remove: Array<string>) {
    this.setOption(`remove`, remove)
    return this
  }
}
