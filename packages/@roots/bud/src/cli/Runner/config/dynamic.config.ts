import chalk from 'chalk'
import {isFunction} from 'lodash'
import {Signale} from 'signale'

import {Bud} from '../../..'

/**
 * @internal
 */
async function callConfig(callback, path) {
  try {
    this.logger.await({
      message: `calling exported function`,
      suffix: chalk.dim(path),
    })

    await callback(this.app)

    this.logger.success({
      message: `calling exported function`,
      suffix: chalk.dim(path),
    })
  } catch (error) {
    this.logger.error({message: error})
  }
}

export async function importConfig(config: string) {
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

/**
 * @internal
 */
async function handleConfig(path: string) {
  const callback = await this.importConfig(path)
  await this.callConfig(callback, path)
}

/**
 * @internal
 */
export async function run(): Promise<void> {
  this.logger.log(this.paths)

  if (
    this.paths === undefined ||
    (Array.isArray(this.paths) && this.paths.length === 0)
  )
    return

  this.paths.length
    ? await Promise.all(this.paths.map(this.handleConfig))
    : await this.handleConfig(this.paths)
}

function configuration(app, logger: Signale, key) {
  this.app = app
  this.paths = app.project.get(key)
  this.handleConfig = handleConfig.bind(this)
  this.run = run.bind(this)
  this.importConfig = importConfig.bind(this)
  this.callConfig = callConfig.bind(this)
  this.logger = logger
}

/**
 * @public
 */
export async function configs(app: Bud, logger: Signale) {
  await new configuration(
    app,
    logger,
    'configs.dynamic.global',
  ).run()
  await app.extensions.processQueue()

  await new configuration(
    app,
    logger,
    'configs.dynamic.conditional',
  ).run()
  await app.extensions.processQueue()
}
