import {Sage} from './interface'
import {bud as sage} from '@roots/bud'
import {Error} from '@roots/bud-cli'

/**
 * Preflight check
 */
export const preflight = () => {
  sage.disk.get('project').has('sage.config.json') &&
    sage.disk.get('project').has('sage.config.js') &&
    (() => {
      new Error(
        'Project contains both a sage.config.json and sage.config.js file. They are mutually exclusive.',
      )

      process.exit(1)
    })()
}

/**
 * Is static
 */
export const isStatic = () =>
  sage.disk.get('project').has('sage.config.json')

/**
 * JSON config
 */
export const json = () => {
  const staticCfg = sage.disk
    .get('project')
    .has('sage.config.json')
    .readJson('sage.config.json')

  const packageJson = sage.disk
    .get('project')
    .has('package.json')
    .readJson('package.json')

  const config: Sage.Config =
    staticCfg ?? packageJson.sage ?? null

  if (!config) {
    new Error(`Sage configuration is unreadable`)

    console.error(staticCfg, packageJson, config)

    process.exit()
  }

  sage.entry(config.entrypoints)
  sage.run()
}

/**
 * API config
 */
export const api = () => {
  require(sage.disk.get('project').get('sage.config.js'))
}
