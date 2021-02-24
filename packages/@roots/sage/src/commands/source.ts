import {Sage} from '../interface'
import {bud as sage} from '@roots/bud'
import {Error} from '@roots/bud-dashboard'

/**
 * Is static
 */
export const isStatic = () =>
  sage.disk.get('project').has('sage.config.json')

/**
 * Is fluent
 */
export const isFluent = () =>
  sage.disk.get('project').has('sage.config.js')

/**
 * Preflight check
 */
export const preflight = () => {
  isStatic() &&
    isFluent() &&
    (() => {
      Error(
        'Project contains both a sage.config.json and sage.config.js file. They are mutually exclusive.',
        'Multiple config sources found.',
      )
    })()
}

/**
 * JSON config
 */
export const json = () => {
  const staticCfg = sage.disk
    .get('project')
    .has('sage.config.json')
    .readJson('sage.config.json')

  const pkgJson = sage.disk
    .get('project')
    .has('package.json')
    .readJson('package.json')

  const config: Sage.Config = staticCfg ?? pkgJson.sage ?? null

  sage.entry(config.entrypoints)
  sage.run()
}

/**
 * API config
 */
export const api = () => {
  require(sage.disk.get('project').get('sage.config.js'))
}
