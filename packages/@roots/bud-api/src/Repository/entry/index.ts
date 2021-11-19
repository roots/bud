import type {Framework} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'
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
 * entry interfaces
 */
//

export interface entry {
  (name: string, entrypoint: EntryValue): Promise<Framework>
}
export interface entry {
  (entrypoints: EntryInput): Promise<Framework>
}

/**
 * sync facade interfaces
 *
 * @remarks
 * prevent intellisense from complaining about bud being a promise
 *
 * @todo
 * probably this could be mapped with a generic type
 */
//

export interface facade {
  (name: string, entrypoint: EntryValue): Framework
}

export interface facade {
  (entrypoints: EntryInput): Framework
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
export const entry: entry = async function (
  ...args
): Promise<Framework> {
  this as Framework

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
  await makeEntrypoints.bind(this)(...entrypoints)

  return this
}

/**
 * Make entrypoints
 *
 * @hook build.entry
 *
 * @internal
 */
async function makeEntrypoints(
  this: Framework,
  entry: EntryObject,
): Promise<Framework> {
  /**
   * Reduce entrypoints to {@link EntryObject}
   *
   * @param entrypoints - {@link EntryObject | accumulator}
   * @param entryTuple - name and raw entry
   *
   * @returns {@link EntryObject | accumulator}
   */
  const reducer = async (
    promised,
    [name, entry]: [string, EntryObject | EntryObject['import']],
  ) => {
    const entrypoints = await promised

    entry = isString(entry) ? {import: [entry]} : entry
    entry = isArray(entry) ? {import: entry} : entry

    entry.import = await getAssets.bind(this)(entry.import)

    this.api.log('success', {
      message: `entrypoints added ${name}`,
      suffix: chalk.dim(JSON.stringify(entry)),
    })

    return {
      ...entrypoints,
      [name]: {
        ...(entrypoints[name] ?? {}),
        import: [
          ...new Set([
            ...(entrypoints[name]?.import ?? []),
            ...entry.import,
          ]),
        ],
      },
    }
  }

  const hook = async (entries: Promise<EntryObject>) => {
    const current = await entries

    const newItems = await Object.entries(entry).reduce(
      reducer,
      Promise.resolve(current ?? {}),
    )

    return {
      ...(current ?? {}),
      ...newItems,
    }
  }

  this.hooks.promise('build.entry', hook)

  return this
}

async function getAssets(
  imports: EntryObject['import'],
): Promise<EntryObject['import']> {
  const globDir = this.path('src')
  this.info({
    message: 'glob search',
    suffix: JSON.stringify(imports),
  })

  this.info({message: 'glob directory', suffix: globDir})

  try {
    const results = await globby(imports, {
      cwd: this.path('src'),
    })

    this.info({
      message: 'glob results',
      suffix: JSON.stringify(results),
    })

    if (!results.length) {
      throw new Error(
        `nothing resolvable for ${JSON.stringify(
          imports,
        )} query of results for ${globDir}`,
      )
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
