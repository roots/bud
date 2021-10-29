import type {Framework} from '@roots/bud-framework'
import type {GlobTask} from 'globby'

import {globby, isArray, isString} from './entry.dependencies'

/**
 * A singular entrypoint asset value
 */
interface EntryObject {
  /**
   * Lower-level representation of entrypoint
   */
  import?: string[]
  /**
   * Array of modules the entrypoint explicitly depends on
   */
  dependsOn?: string[]
}

/**
 * Entry assets expressed as a key-value mapping
 */
interface EntryInput {
  [k: string]:
    | EntryObject
    | EntryObject['import']
    | GlobTask['pattern']
}

/**
 * An entry asset or an array of entry assets expressed with fast-glob syntax.
 */
type EntryValue =
  | GlobTask['pattern']
  | Array<GlobTask['pattern']>

/**
 * {@link entry} interface supporting the definition of a single entrypoint
 *
 * @param name - Entrypoint name
 * @param entrypoint - Entrypoint value
 *
 * @hook build/entry
 *
 * @public @config
 */
export interface entry {
  (
    this: Framework,
    name: string,
    entrypoint: EntryValue,
  ): Framework
}

/**
 * {@link entry} interface supporting the definition of multiple
 * entrypoints using a key-value mapping
 *
 * @param this - {@link @roots/bud-framework#Framework | Framework instandce}
 * @param entrypoints - {@link EntryInput | Entrypoint mapping}
 *
 * @hook build/entry
 *
 * @public @config
 */
export interface entry {
  (this: Framework, entrypoints: EntryInput): Framework
}

/**
 * Generate application entrypoints from source asset paths.
 *
 * @remarks
 * **Globbing**
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
 * @example
 * Create an entrypoint from a single file:
 *
 * ```js
 * app.entry('app', 'app.js')
 * ```
 *
 * @example
 * Create an entrypoint from multiple files:
 *
 * ```js
 * app.entry('app', ['js/app.js', 'css/app.css'])
 * ```
 *
 * @example
 * Create an entrypoint comprised of all js assets:
 *
 * ```js
 * app.entry('app', '*.js')
 * ```
 *
 * @example
 * You may create more than one entrypoint using object syntax:
 *
 * ```js
 * app.entry({
 *   scripts: '*.js',
 *   styles: ['*.css', '*.scss'],
 * })
 * ```
 *
 * @example
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
 * ```
 *
 * @public @config
 */
export const entry: entry = function (...args) {
  /**
   * Ducktype entrypoint to determine if it was called like
   * `entry(name, ...assets)` or `entry({[name]: ...assets})`
   */
  const isSingleEntry = isString(args[0]) && args.length > 1

  /**
   * Cast single assets to an array
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
 *
 * @hook build/entry
 *
 * @internal
 */
function makeEntrypoints(entry: EntryObject): Framework {
  /**
   * Reduce entrypoints to {@link EntryObject}
   *
   * @param entrypoints - {@link EntryObject | accumulator}
   * @param entryTuple - name and raw entry
   *
   * @returns {@link EntryObject | accumulator}
   */
  const buildEntryReducer = (
    entrypoints,
    [name, entry]: [string, EntryObject | EntryObject['import']],
  ) => {
    entry = isString(entry) ? {import: [entry]} : entry
    entry = isArray(entry) ? {import: entry} : entry

    return {
      ...entrypoints,
      [name]: {
        ...(entrypoints[name] ?? {}),
        ...getAssets.bind(this)(name, entry),
      },
    }
  }

  const buildEntryHook = (existant: EntryObject) => {
    return {
      ...existant,
      ...Object.entries(entry).reduce(buildEntryReducer, {}),
    }
  }

  this.hooks.on('build/entry', buildEntryHook)

  return this
}

/**
 * Normalize an entrypoint expression
 *
 * @internal
 */
const normalize = (
  assets: string | string[],
): EntryObject['import'] => (isArray(assets) ? assets : [assets])

/**
 * Get entrypoint assets as their final object representation
 *
 * @remarks
 * We test to see if the entrypoints are resolvable but we don't fail if they aren't. For two reasons:
 *
 * 1. The entrypoint might not exist on disk yet.
 * 2. The entrypoint might be a glob pattern.
 *
 * @param name - Entrypoint name
 * @param entry - {@link EntryObject}
 *
 * @returns {@link EntryObject}
 *
 * @internal
 */
function getAssets(
  _name: string,
  entry: EntryObject,
): EntryObject {
  /**
   * Take an entry and see if all assets are resolvable.
   *
   * @param resolvable - {@link resolvable | boolean accumulator that is true if entrypoint is resolvable on disk}
   * @param asset - {@link asset | string asset to check}
   *
   * @returns
   */
  const isResolvable = (
    resolvable: boolean,
    asset: string,
  ): boolean => {
    if (!resolvable) return false

    try {
      require.resolve(asset)
      return true
    } catch {
      return false
    }
  }

  /**
   * If the supplied strings are ALL directly resolvable, use them.
   * Otherwise, treat as glob.
   */
  entry.import = normalize(entry.import).reduce(
    isResolvable,
    true,
  )
    ? entry.import // all specified files were directly resolvable
    : /**
       * ...instead, try for glob
       */
      globby.globbySync(entry.import, {
        cwd: this.path('src'),
        expandDirectories: true,
      }) ??
      /**
       * Fallback to import as specified
       */
      entry.import

  this.info(`entrypoint added`, entry)

  return entry
}
