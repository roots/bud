import {bud} from '@roots/bud'
import {Error} from '@roots/bud-dashboard'

/**
 * Is static
 */
export const isStatic = () =>
  bud.disk.get('project').has('bud.config.json')

/**
 * Is fluent
 */
export const isFluent = () =>
  bud.disk.get('project').has('bud.config.js')

/**
 * Preflight check
 */
export const preflight = () => {
  isStatic() &&
    isFluent() &&
    (() => {
      Error(
        'Project contains both a bud.config.json and bud.config.js file. Thy are mutually exclusive.',
        'Multiple config sources found.',
      )
    })()

  return true
}

/**
 * JSON config
 */
export const json = () => {
  const config =
    bud.disk
      .get('project')
      .has('bud.config.json')
      .readJson('bud.config.json') ??
    bud.disk
      .get('project')
      .has('package.json')
      .readJson('package.json') ??
    null

  bud.entry(config.entrypoints)
  bud.run()
}

/**
 * API config
 */
export const api = () => {
  require(bud.disk.get('project').get('bud.config.js'))
}
