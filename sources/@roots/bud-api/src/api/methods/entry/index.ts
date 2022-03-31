import type {Framework} from '@roots/bud-framework'
import type {EntryObject} from '@roots/bud-framework/types/entry'
import {globby, lodash} from '@roots/bud-support'

const {isArray, isString} = lodash

export {EntryObject}

export type Input =
  | [string, string]
  | [string, Array<string>]
  | [Record<string, string>]
  | [Record<string, Array<string>>]
  | [Record<string, EntryObject>]

export interface entry {
  (...entrypoint: Input): Promise<Framework>
}

export interface facade {
  (...entrypoint: Input): Framework
}

const isGlobular = (str: string) =>
  ['*', '{', '}', ','].filter(c => str.includes(c))?.length > 0

export const entry: entry = async function (...input) {
  const ctx = this as Framework
  const glob: typeof globAssets = globAssets.bind(this)

  const normal = isString(input[0])
    ? {
        [input[0]]: isArray(input[1])
          ? {import: input[1]}
          : isString(input[1])
          ? {import: [input[1]]}
          : input[1],
      }
    : input[0]

  const entryObject = await Promise.all(
    Object.entries(normal).map(async ([name, entry]) => {
      const importArray = isArray(entry.import ?? entry)
        ? entry.import ?? entry
        : [entry.import ?? entry]

      this.log(`inputs`, importArray)

      entry.import = (
        await Promise.all(
          importArray.map(async (request: string) =>
            isGlobular(request) ? await glob(request) : request,
          ),
        )
      ).flat()

      return [name, entry]
    }),
  )

  ctx.hooks.on('build.entry', all =>
    entryObject.reduce(
      (all, [name, entry]) => ({
        ...(all ?? {}),
        [name]: {
          ...(!isString(entry) && !isArray(entry) ? entry : {}),
          import: entry.import,
        },
      }),
      all,
    ),
  )

  return ctx
}

export async function globAssets(search: string): Promise<Array<string>> {
  try {
    this.log(`search`, search)
    const results = await globby.globby(search, {cwd: this.path('@src')})

    this.log(`results`, results)

    if (!results.length) {
      this.error(
        `bud.entry found no files matching ${JSON.stringify(
          search,
        )}. check your config for errors. files should be specified relative to ${this.path(
          '@src',
        )}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )
      throw new Error(
        `nothing resolvable for ${JSON.stringify(
          search,
        )} query of results for ${this.path('@src')}`,
      )
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
