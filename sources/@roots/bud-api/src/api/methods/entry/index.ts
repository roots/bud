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
  [k: string]: EntryObject | EntryObject['import'] | GlobTask['pattern']
}

/**
 * An entry asset or an array of entry assets expressed with fast-glob syntax.
 */
type EntryValue = GlobTask['pattern'] | Array<GlobTask['pattern']>

export interface entry {
  (name: string, entrypoint: EntryValue): Promise<Framework>
}
export interface entry {
  (entrypoints: EntryInput): Promise<Framework>
}

export interface facade {
  (name: string, entrypoint: EntryValue): Framework
}

export interface facade {
  (entrypoints: EntryInput): Framework
}

export const entry: entry = async function (...args): Promise<Framework> {
  this as Framework

  /**
   * Ducktype entrypoint to determine if it was called like
   * `entry(name, ...assets)` or `entry({[name]: ...assets})`
   */
  const isSingleEntry = isString(args[0]) && args.length > 1

  /**
   * Cast single assets to an array
   */
  const entrypoints = isSingleEntry ? [{[args[0]]: args[1]}] : args

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
   * @returns entry object
   */
  const reducer = async (
    promised,
    [name, entry]: [
      string,
      {
        import?: string[]
        dependsOn?: string[]
      },
    ],
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

  const hook = async (
    entries: Record<
      string,
      {
        import?: string[]
        dependsOn?: string[]
      }
    >,
  ) => {
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

  this.hooks.async<'build.entry'>('build.entry', hook)

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
      this.error(
        `bud.entry found no files matching ${JSON.stringify(
          imports,
        )}. check your config for errors. files should be specified relative to ${this.path(
          'src',
        )}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )
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
