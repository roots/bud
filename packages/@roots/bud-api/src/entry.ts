import {Framework} from '@roots/bud-framework'
import {GlobTask, isArray, isString} from '@roots/bud-support'
import {Error} from '@roots/bud-dashboard'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## entry [💁 Fluent]
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
     *
     * - `?` matches a single character, but not `/`
     *
     * - `**` matches any number of characters, including `/`,
     *   as long as it's the only thing in a path part
     *
     * - `{}` allows for a comma-separated list  of "or" expressions
     *
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
     */
    entry: Framework.Api.Entry
  }

  namespace Framework.Api {
    /**
     * An entrypoint expressed as a single name and value.
     */
    interface Entry {
      (
        /**
         * Entrypoint name (string)
         */
        name: Entry.Key,

        /**
         * May be a string or array of strings. May use fast-glob syntax.
         */
        entrypoint: Entry.Value,
      ): Framework
    }

    /**
     * An entrypoint expressed as a keyed object.
     */
    interface Entry {
      (
        /**
         * Entrypoint name as key;
         * Values may be a string or array of strings.
         * Values may use fast-glob syntax.
         */
        entrypoints: Framework.Api.Entry.Obj,
      ): Framework
    }

    namespace Entry {
      /**
       * Entrypoint name as key;
       * Values may be either a string or array of strings.
       * Values may use fast-glob syntax.
       */
      interface Obj {
        [key: string]: Value
      }

      /**
       * Entrypoint name
       */
      type Key = string

      /**
       * **Supported patterns**
       *
       * - `*` matches any number of characters, but not `/`
       *
       * - `?` matches a single character, but not `/`
       *
       * - `**` matches any number of characters, including `/`,
       *   as long as it's the only thing in a path part
       *
       * - `{}` allows for a comma-separated list  of "or" expressions
       *
       * - `!` at the beginning of a pattern will negate the match
       */
      type Value =
        | GlobTask['pattern']
        | Array<GlobTask['pattern']>
    }
  }
}

/**
 * Entry fn
 *
 * Depending on if a single entrypoint or a keyed set
 * of entrypoints was passed, the args will be
 * passed to the appropriate handler.
 */
export const entry: Framework.Api.Entry = function (
  ...args:
    | [Framework.Api.Entry.Key, Framework.Api.Entry.Value]
    | [Framework.Api.Entry.Obj]
) {
  /**
   * Ducktype entrypoint to determine if it was called like
   * entry(name, ...assets) or entry({[name]: ...assets})
   */
  const isSingleEntry = isString(args[0]) && args.length > 1

  /**
   * Cast single asset calls to keyed obj
   */
  const entrypoints = isSingleEntry
    ? [{[args[0] as Framework.Api.Entry.Key]: args[1]}]
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
function makeEntrypoints(
  this: Framework,
  entry: Framework.Api.Entry.Obj,
): Framework {
  this.store.merge(
    'options.entry',
    Object.entries(entry).reduce(
      (a, [name, task]) => ({
        ...a,
        [name]: getAssets.bind(this)(name, task),
      }),
      {},
    ),
  )

  return this
}

/**
 * Get entrypoint assets
 */
function getAssets(
  name: string,
  task: string | string[],
): string[] {
  /**
   * Cast the entrypoint as an array
   */
  const files = isArray(task) ? task : [task]

  /**
   * Find all the matching assets on disk
   */
  const assets = this.disk.glob.sync(
    isArray(task) ? task : [task],
    {
      cwd: this.src(),
      expandDirectories: true,
    },
  )

  /**
   * Found nothing for specified glob
   */
  if (!(assets.length > 0)) {
    Error(
      `${files.toString()} did not return any results. Make sure these assets are available on disk.`,
      'Assets not found',
    )
  }

  /**
   * Entrypoints will always generate a JS file even when it is
   * just boilerplate (css only entrypoint)
   *
   * @webpack5 this is no longer necessary
   */
  if (isCssOnlyEntrypoint(assets)) {
    this.publish(
      {
        'extension/ignore-emit-webpack-plugin/options/ignore': ignore => [
          [...ignore, name.concat('.js')],
        ],
      },
      'api/entry',
    )
  }

  return assets
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
