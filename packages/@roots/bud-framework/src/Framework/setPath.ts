import {Framework} from '.'

/**
 * setPath function interface
 *
 * @internal
 */
interface setPath {
  (this: Framework, ...args): Framework
}

/**
 * Set a {@link @roots/bud-framework#Location | Location} value
 *
 * @remarks
 * The {@link Locations.project} should be an absolute path.
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
 * @returns {@link Framework}
 *
 * @public
 */
function setPath(this: Framework, ...args): Framework {
  if (typeof args[0] == 'string') {
    this.hooks.on(`location/${args[0]}`, args[1])
    return this
  }

  if (Object.entries(args[0]).length === 0) {
    this.error(
      `${args[0].toString()} cannot be empty. It should be an object with keys set to registered locations: ['src', 'dist', 'storage', 'publicPath', 'project']`,
      `Type error`,
    )
  }

  Object.entries(args[0]).map(([k, v]: [string, string]) => {
    this.when(k == 'project' && !v.startsWith('/'), () => {
      this.error(
        'The project path must be absolute',
        'Type error',
      )
    })

    this.when(
      !['project', 'publicPath'].includes(k) &&
        v.startsWith('/'),
      () => {
        this.warn(
          `Path: ${k} was defined as ${v}. This path should be relative to the project root. You should fix this.`,
        )

        v = v.replace(this.hooks.filter('location/project'), '')
      },
    )

    this.hooks.on(`location/${k}`, v)
  })

  return this
}

export {setPath}
