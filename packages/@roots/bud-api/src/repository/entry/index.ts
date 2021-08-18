import type {Framework} from '@roots/bud-framework'
import {globby} from '@roots/bud-support'
import {isArray, isString} from 'lodash'

import type {Repository} from '../'

const entry: Repository.Entry = function (...args) {
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
 * @internal
 */
function makeEntrypoints(
  entry: Repository.Entry.Object,
): Framework {
  this.hooks.on(
    'build/entry',
    (existant: Repository.Entry.Object) => {
      return {
        ...existant,
        ...Object.entries(entry).reduce(
          (
            entrypoints,
            [name, entry]: [
              string,
              (
                | Repository.Entry.Object
                | Repository.Entry.Object['import']
              ),
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
    },
  )

  return this
}

/**
 * Normalize Task
 * @internal
 */
const normalize = (
  assets: string | string[],
): Repository.Entry.Object['import'] =>
  isArray(assets) ? assets : [assets]

/**
 * Get entrypoint assets
 * @internal
 */
function getAssets(
  name: string,
  entry: Repository.Entry.Object,
): Repository.Entry.Object {
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
    ? entry.import // all specified files were directly resolvable
    : /**
       * Try for glob
       */
      globby.globbySync(entry.import, {
        cwd: this.path('src'),
        expandDirectories: true,
      }) ??
      /**
       * Fallback to import as specified
       */
      entry.import

  return entry
}

export {entry}
