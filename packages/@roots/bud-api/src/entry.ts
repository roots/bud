import {Framework} from '@roots/bud-framework'
import {GlobTask, isArray, isString} from '@roots/bud-support'

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
  const singleEntryHandler = isString(args[0]) && args.length > 1

  const handler = singleEntryHandler
    ? single.bind(this)
    : multi.bind(this)

  return handler(...args)
}

/**
 * Globby options
 */
const makeOptions = function (this: Framework) {
  return {
    cwd: this.src(),
    expandDirectories: true,
  }
}

const single = function (
  this: Framework,
  name: Framework.Api.Entry.Key,
  pattern: Framework.Api.Entry.Value,
): Framework {
  // Globby options
  const options = makeOptions.bind(this)()

  // Enforce array
  const task = isArray(pattern) ? pattern : [pattern]

  // Perform glob query
  const assets = this.disk.glob.sync(task, options)

  // Ensure results
  const valid = assets?.length && assets?.length > 0

  /**
   * Build hook
   */
  valid &&
    this.hooks.on(`webpack.entry`, entry => ({
      ...entry,
      [name]: assets,
    }))

  return this
}

export const multi = function (
  entrypoints: Framework.Api.Entry.Obj,
): Framework {
  // Globby options
  const options = makeOptions.bind(this)()

  /**
   * Build hook
   */
  this.hooks.on(`webpack.entry`, entry => ({
    // Existing entrypoints
    ...entry,

    /**
     * Reduce entrypoints from supplied entries
     */
    ...Object.entries(entrypoints).reduce(
      (a, [name, task]) => ({
        ...a,
        [name]: this.disk.glob.sync(
          isArray(task) ? task : [task],
          options,
        ),
      }),
      {},
    ),
  }))

  return this
}
