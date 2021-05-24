import {Api, Framework} from '@roots/bud-framework'
import {sync, GlobTask} from 'globby'
import {isArray, isString} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## entry
     *
     * Generate application entrypoints from source asset paths.
     *
     * ### Globbing
     *
     * Uses [fast-glob](https://git.io/JkGbw) syntax.
     *
     * **Supported patterns**
     *
     * - `*` matches any number of characters, but not `/`
     * - `?` matches a single character, but not `/`
     * - `**` matches any number of characters, including `/`,
     *   as long as it's the only thing in a path part
     * - `{}` allows for a comma-separated list  of "or" expressions
     * - `!` at the beginning of a pattern will negate the match
     *
     * ### Usage
     *
     * Create an entrypoint from a single file:
     *
     * ```js
     * app.entry('app', 'app.js')
     * ```
     *
     * Create an entrypoint from multiple files:
     *
     * ```js
     * app.entry('app', ['js/app.js', 'css/app.css'])
     * ```
     *
     * Create an entrypoint comprised of all js assets:
     *
     * ```js
     * app.entry('app', '*.js')
     * ```
     *
     * You may create more than one entrypoint using object syntax:
     *
     * ```js
     * app.entry({
     *   scripts: '*.js',
     *   styles: ['*.css', '*.scss'],
     * })
     * ```
     *
     * Declare entrypoint dependencies:
     *
     * ```js
     * app.entry({
     *  react: {
     *    import: ['react', 'react-dom']
     *  },
     *  app: {
     *    import: ['app.js'],
     *    dependOn: ['react'],
     *  },
     * })
     */
    entry: Api.Entry
  }

  namespace Api {
    interface Entry {
      (name: string, entrypoint: Entry.Value): Framework
    }

    interface Entry {
      (entrypoints: Entry.Input): Framework
    }

    namespace Entry {
      interface Object {
        import?: string[]
        dependsOn?: string[]
      }

      interface Input {
        [k: string]: Object | Object['import'] | string
      }

      type Value =
        | GlobTask['pattern']
        | Array<GlobTask['pattern']>
    }
  }
}

export const entry: Api.Entry = function (...args) {
  /**
   * Ducktype entrypoint to determine if it was called like
   * entry(name, ...assets) or entry({[name]: ...assets})
   */
  const isSingleEntry = isString(args[0]) && args.length > 1

  /**
   * Cast single asset calls to keyed obj
   */
  const entrypoints = isSingleEntry
    ? [{[args[0]]: args[1]}]
    : args

  /**
   * Make the entrypoints and return the framework
   * to the builder
   */
  return makeEntrypoints.bind(this)(...entrypoints)
}

/**
 * Make entrypoints
 */
function makeEntrypoints(entry: Api.Entry.Object): Framework {
  this.hooks.on('build/entry', (existant: Api.Entry.Object) => {
    return {
      ...existant,
      ...Object.entries(entry).reduce(
        (
          entrypoints,
          [name, entry]: [
            string,
            Api.Entry.Object | Api.Entry.Object['import'],
          ],
        ) => {
          /**
           * Normalize entrypoint
           */
          entry = isString(entry) ? {import: [entry]} : entry
          entry = isArray(entry) ? {import: entry} : entry

          return {
            ...entrypoints,
            [name]: {
              ...(entrypoints[name] ?? {}),
              ...getAssets.bind(this)(name, entry),
            },
          }
        },
        {},
      ),
    }
  })

  return this
}

/**
 * Normalize Task
 */
const normalize = (
  assets: string | string[],
): Api.Entry.Object['import'] =>
  isArray(assets) ? assets : [assets]

/**
 * Get entrypoint assets
 */
function getAssets(
  name: string,
  entry: Api.Entry.Object,
): Api.Entry.Object {
  /**
   * If the supplied strings are ALL directly resolvable, use them.
   * Otherwise, treat as glob.
   */
  entry.import = normalize(entry.import).reduce(
    (resolvable: boolean, asset: string): boolean => {
      if (!resolvable) return false

      try {
        require.resolve(asset)
        return true
      } catch {
        return false
      }
    },
    true,
  )
    ? entry.import
    : sync(entry.import, {
        cwd: this.path('src'),
        expandDirectories: true,
      })

  /**
   * Invalid entrypoint
   */
  if (!(entry.import.length > 0)) {
    console.error('Assets not found')
    console.error(
      `entrypoint ${name} did not return any results. Make sure these assets are available on disk.\n`,
    )
    process.exit()
  }

  /**
   * Entrypoints will always generate a JS file even when it is
   * just boilerplate (css only entrypoint)
   */
  if (isCssOnlyEntrypoint(entry.import)) {
    this.extensions
      .get('ignore-emit-webpack-plugin')
      .set('options', options => ({
        ignore: [...(options.ignore ?? []), name.concat('.js')],
      }))
  }

  return entry
}

/**
 * Return true if entrypoint is comprised of nothing but css files.
 *
 * @webpack5 this is no longer necessary
 */
function isCssOnlyEntrypoint(assets: string[]): boolean {
  const getType = (file: string) => file.split('.').pop()
  const notCss = (file: string) => getType(file) !== 'css'
  const cssOnly = (entry: string[]) =>
    entry.filter(f => notCss(f))?.length == 0

  return cssOnly(assets)
}
