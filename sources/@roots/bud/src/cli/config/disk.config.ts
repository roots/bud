import {Bud} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

import {ConfigManifest} from '../../services/Project/repository'

const {isFunction, isObject} = lodash

/**
 * User config parser
 *
 * @public
 */
class Configuration {
  /**
   * Manifest
   *
   * @public
   */
  public manifest: Record<
    string,
    Record<string, unknown> | ((app: Bud) => Promise<unknown>)
  > = {}

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud, public manifests: ConfigManifest) {
    manifests &&
      Object.values(manifests)
        .filter(config => config?.name?.includes('bud.config'))
        .map(config => {
          this.manifest[config.name] = config.module
        })

    Object.keys(this.manifest).map(k =>
      this.app.info({message: `Processing config: ${k}`}),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(): Promise<void> {
    await Promise.all(
      Object.entries(this.manifest).map(async ([name, config]) => {
        if (!isFunction(config) && !isObject(config))
          return this.app.error(
            `bud tried to parse ${
              name ?? 'unknown file'
            } but it doesn't seem to be a function or an object config`,
          )

        isFunction(config)
          ? await config(this.app)
          : await this.processStatic(config)
      }),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   * @decorator `@log`
   */
  @bind
  public async processStatic(config: Record<string, any>): Promise<void> {
    await Promise.all(
      Object.entries(config).map(async ([key, value]) => {
        const request = this.app[key]

        if (isFunction(request)) await request(value)
      }),
    )
  }
}

/**
 * @public
 */
export const config = async (app: Bud) => {
  const process = async (manifests: ConfigManifest): Promise<void> => {
    await app.api.processQueue()
    await new Configuration(app, manifests).run()
    await app.api.processQueue()
  }

  const baseConfig = app.project.get(`config.base`)
  await process(baseConfig)

  const modeSpecific = app.project.get(`config.${app.mode}`)
  await process(modeSpecific)
}
