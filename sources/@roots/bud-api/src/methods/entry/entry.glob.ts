import type {Bud} from '@roots/bud-framework'
import globby from '@roots/bud-support/globby'

export async function globAssets(search: string): Promise<Array<string>> {
  try {
    const app = this as Bud

    const results = await globby(search, {cwd: app.path(`@src`)})

    if (!results.length) {
      app.warn(
        `bud.entry found no files matching ${JSON.stringify(
          search,
        )}. check your config for errors. files should be specified relative to ${this.path(
          `@src`,
        )}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )

      return [search]
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
