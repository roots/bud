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
  ['*', '{', '}'].filter(c => str.includes(c))?.length > 0

export const entry: entry = async function (...userInput) {
  const ctx = this as Framework
  const glob: typeof globAssets = globAssets.bind(this)

  const normalizedInput = isString(userInput[0])
    ? {[userInput[0]]: userInput[1]}
    : userInput[0]

  ctx.hooks.async('build.entry', async all => {
    await Promise.all(
      Object.entries(normalizedInput).map(async ([name, entry]) => {
        const normalizedImports = isArray(entry.import ?? entry)
          ? entry.import ?? entry
          : [entry.import ?? entry]

        this.log(`inputs`, normalizedImports)

        const value = (
          await Promise.all(
            normalizedImports.map(async (request: string) =>
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
  const cwd = this.path('@src')

  try {
    this.log(`search`, search)
    const results = await globby.globby(search, {cwd})

    this.log(`results`, results)

    if (!results.length) {
      this.error(
        `bud.entry found no files matching ${JSON.stringify(
          search,
        )}. check your config for errors. files should be specified relative to ${cwd}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )
      throw new Error(
        `nothing resolvable for ${JSON.stringify(
          search,
        )} query of results for ${cwd}`,
      )
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
