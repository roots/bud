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

  const normal = isString(input[0]) ? {[input[0]]: input[1]} : input[0]

  ctx.hooks.async('build.entry', async all => {
    await Promise.all(
      Object.entries(normal)
        .map(([name, entry]) => [name, entry.import ?? entry])
        .map(async ([name, entry]) => {
          const arrayedImports = isArray(entry) ? entry : [entry]

          this.log(`importing..`, arrayedImports)

          const value = (
            await Promise.all(
              arrayedImports.map(async (request: string) =>
                isGlobular(request) ? await glob(request) : request,
              ),
            )
          ).flat()

          all = {
            ...(all ?? {}),
            [name]: {
              ...(!isString(entry) && !isArray(entry) ? entry : {}),
              import: value,
            },
          }
        }),
    )

    return all
  })

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
