import {Framework} from '.'

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
export function setPath(...args): Framework {
  const ctx = this as Framework

  if (typeof args[0] == 'string') {
    ctx.hooks.on(`location.${args[0]}`, args[1])
    ctx.info(`${args[0]} set to ${args[1]}`)
    return this
  }

  if (Object.entries(args[0]).length === 0) {
    ctx.error(
      `${args[0].toString()} cannot be empty. It should be an object with keys set to registered locations: ['src', 'dist', 'storage', 'publicPath', 'project']`,
    )
  }

  Object.entries(args[0]).map(([k, v]: [string, string]) => {
    ctx.when(k == 'project' && !v.startsWith('/'), () => {
      ctx.error(
        'The project path must be absolute',
        'Type error',
      )
    })

    ctx.when(
      !['project', 'publicPath'].includes(k) &&
        v.startsWith('/'),
      () => {
        ctx.warn(
          `${k} was defined as ${v}. This path should be relative to the project root. You should fix ctx.`,
        )

        v = v.replace(ctx.hooks.filter('location.project'), '')
      },
    )

    ctx.hooks.on(`location.${k}`, v)
    ctx.info(`${k} set to ${v}`)
  })

  return ctx
}
