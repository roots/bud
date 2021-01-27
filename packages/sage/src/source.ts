import {Sage} from './interface'
import {sage} from './sage'

/**
 * Preflight check
 */
export const preflight = () => {
  sage.disk.get('project').has('sage.config.json') &&
    sage.disk.get('project').has('sage.config.js') &&
    (() => {
      console.error(
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
  const config: Sage.Config = sage.disk
    .get('project')
    .readJson('sage.config.json')

  Object.entries(config.entrypoints).forEach(entrypoint => {
    sage.entry(...entrypoint)
  })

  sage.run()
}

/**
 * API config
 */
export const api = () => {
  require(sage.disk.get('project').get('sage.config.js'))
}
