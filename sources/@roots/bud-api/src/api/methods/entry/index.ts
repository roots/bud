import type {Framework} from '@roots/bud-framework'
import type {EntryObject} from '@roots/bud-framework/types/entry'
import {isArray} from 'lodash'

import {globby, isString} from './entry.dependencies'

export {EntryObject}

type Input =
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
  ['*', '{', '}'].filter(c => str.includes(c)).length > 0

export const entry: entry = async function (
  ...useInput: Input
): Promise<Framework> {
  const ctx = this as Framework
  const glob: typeof globAssets = globAssets.bind(this)

  const normalizedInput = isString(useInput[0])
    ? {[useInput[0]]: useInput[1]}
    : useInput[0]

  ctx.hooks.async('build.entry', async all => {
    await Promise.all(
      Object.entries(normalizedInput).map(async ([name, entry]) => {
        const normalizedImports = isArray(entry.imports ?? entry)
          ? entry.imports ?? entry
          : [entry.imports ?? entry]

        const value = (
          await Promise.all(
            normalizedImports.map(async (request: string) =>
              isGlobular(request) ? await glob(request) : request,
            ),
          )
        ).flat()

        Object.assign(all, {
          [name]: {import: value, ...(entry.dependOn ?? {})},
        })
      }),
    )

    return all
  })

  return ctx
}

export async function globAssets(search: string): Promise<Array<string>> {
  const globDir = this.path('src')

  try {
    const results = await globby.globby(search, {
      cwd: this.path('src'),
    })

    if (!results.length) {
      this.error(
        `bud.entry found no files matching ${JSON.stringify(
          search,
        )}. check your config for errors. files should be specified relative to ${this.path(
          'src',
        )}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )
      throw new Error(
        `nothing resolvable for ${JSON.stringify(
          search,
        )} query of results for ${globDir}`,
      )
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
