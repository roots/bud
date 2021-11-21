import {chalk, lodash, Signale} from '@roots/bud-support'

import {Bud} from '../../..'

const {isFunction} = lodash

/**
 * @internal
 */
class Configuration {
  /**
   * Class constructor
   *
   * @param app - Bud instance
   * @param logger - Logger instance
   * @param key - configuration key (project service repository)
   */
  public constructor(
    public app: Bud,
    public logger: Signale,
    public paths: Array<string>,
  ) {
    paths.map(path => {
      this.logger.log(`processing ${path}`)
    })
  }

  /**
   * @internal
   */
  public async run(): Promise<void> {
    await Promise.all(
      this.paths.map(async path => {
        const callback = await this.import(path)
        await this.invoke(callback, path)
      }),
    )
  }

  /**
   * @internal
   */
  public async import(config: string) {
    try {
      this.logger.await({
        message: 'importing module',
        suffix: chalk.dim(config),
      })

      const raw = config.endsWith('.ts')
        ? await this.app.ts.read(config)
        : await import(config)

      const result = isFunction(raw?.default) ? raw.default : raw

      if (!isFunction(result)) {
        this.logger.error({message: config})
        throw new Error(`${config} is not a function`)
      }

      return result
    } catch (e) {
      this.logger.error('error', e)
    }
  }

  /**
   * @internal
   */
  public async invoke(callback, path) {
    try {
      if (!isFunction(callback)) {
        this.logger.error({message: path})
        throw new Error(`${path} is not a function`)
      }

      this.logger.await({
        message: `calling user config`,
        suffix: chalk.dim(path),
      })

      await callback(this.app)
    } catch (error) {
      this.logger.error({message: error})
    }
  }
}

/**
 * @internal
 */
export const configs = async (app: Bud, logger: Signale) => {
  const generalConfigs = app.project.get(
    'configs.dynamic.global',
  )
  const conditionalConfigs = app.project.get(
    'configs.dynamic.conditional',
  )

  if (generalConfigs?.length) {
    const config = new Configuration(app, logger, generalConfigs)
    await config.run()
    await app.api.processQueue()
    await app.extensions.processQueue()
  }

  if (conditionalConfigs?.length) {
    const config = new Configuration(
      app,
      logger,
      conditionalConfigs,
    )
    await config.run()
    await app.api.processQueue()

    // run extensions before processing next config
    await app.extensions.processQueue()
  }
}
