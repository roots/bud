import {bud} from '@roots/bud'
import {Error} from '@roots/bud-dashboard'

/**
 * Is static
 */
const isStatic = () =>
  bud.disk.get('project').has('bud.config.json')

/**
 * Is fluent
 */
const isFluent = () =>
  bud.disk.get('project').has('bud.config.js')

/**
 * Preflight check
 */
const preflight = () => {
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
const json = () => {
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
const api = () => {
  require(bud.disk.get('project').get('bud.config.js'))
}

export {isStatic, isFluent, preflight, json, api}
