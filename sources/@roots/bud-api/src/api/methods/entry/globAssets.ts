import {globby} from '@roots/bud-support'

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
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}
