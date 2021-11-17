import chalk from 'chalk'
import {isFunction} from 'lodash'
import {Signale} from 'signale'

import {Bud} from '../../..'

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

  public async run(): Promise<void> {
    await Promise.all(
      this.paths.map(async path => {
        const callback = await this.import(path)
        await this.invoke(callback, path)
      }),
    )
  }

  public async import(config: string) {
    try {
      this.logger.await({
        message: 'importing module',
        suffix: chalk.dim(config),
      })

      this.logger.log(config)

      const raw = config.endsWith('.ts')
        ? await this.app.ts.read(config)
        : await import(config)

      const result = isFunction(raw?.default) ? raw.default : raw

      if (!isFunction(result)) {
        this.logger.error({message: config})
        throw new Error(`${config} is not a function`)
      }

      this.logger.success({
        message: 'importing module',
        suffix: chalk.dim(config),
      })

      return result
    } catch (e) {
      this.logger.error('error', e)
    }
  }

  public async invoke(callback, path) {
    try {
      if (!isFunction(callback)) {
        this.logger.error({message: path})
        throw new Error(`${path} is not a function`)
      }

      this.logger.await({
        message: `processing user config`,
        suffix: chalk.dim(path),
      })

      await callback(this.app)
      await this.app.extensions.processQueue()

      this.logger.success({
        message: `processing user config`,
        suffix: chalk.dim(path),
      })
    } catch (error) {
      this.logger.error({message: error})
    }
  }
}

/**
 * @public
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
    await app.api.callAll()

    // run extensions before processing next config
    await app.extensions.processQueue()
  }

  if (conditionalConfigs?.length) {
    const config = new Configuration(
      app,
      logger,
      conditionalConfigs,
    )
    await config.run()
    await app.api.callAll()

    // run extensions before processing next config
    await app.extensions.processQueue()
  }
}
