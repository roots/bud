import {Framework} from '..'

/**
 * setPath function interface
 *
 * @internal
 */
export interface setPath {
  (...args): Framework
}

/**
 * Set a {@link @roots/bud-framework#Location | Location} value
 *
 * @remarks
 * The {@link Location.project} should be an absolute path.
 * All other directories should be relative (src, dist, etc.)
 * @see {@link Locations}
 *
 * @example
 * ```js
 * bud.setPath('src', 'custom/src')
 * ```
 *
 * @param this - {@link Framework}
 * @param args - path parts
 *
 * @public
 */
export function setPath(...args): Framework {
  this as Framework

  if (typeof args[0] == 'string') {
    this.hooks.on(`location.${args[0]}`, args[1])
    this.info(`${args[0]} set to ${args[1]}`)

    return this
  }

  if (Object.entries(args[0]).length === 0) {
    this.error({
      message: `${args[0].toString()} cannot be empty. It should be an object with keys set to registered locations`,
    })
  }

  Object.entries(args[0]).map(([k, v]: [string, string]) => {
    this.when(k == 'project' && !v.startsWith('/'), () => {
      this.error({
        message: 'The project path must be absolute',
      })
    })

    this.when(
      !['project'].includes(k) && v.startsWith('/'),
      () => {
        this.warn({
          message: `${k} was defined as ${v}.`,
          suffix: `This path should be relative to the project root. You should fix this.`,
        })

        v = v.replace(this.hooks.filter('location.project'), '')
      },
    )

    this.hooks.on(`location.${k}`, v)
    this.info({message: `${k} set`, suffix: v})
  })

  return this
}
