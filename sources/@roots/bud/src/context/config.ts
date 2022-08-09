import {globby} from 'globby'
import {bind} from 'helpful-decorators'
import {basename, join, normalize} from 'node:path/posix'

/**
 * Context: disk
 *
 * @public
 */
export default class Config {
  /**
   * Config data
   *
   * @public
   */
  public data: Record<string, string> = {}

  /**
   * Find configs
   *
   * @public
   */
  @bind
  public async find(basedir: string): Promise<Config> {
    await globby(
      [
        `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`,
        `*rc`,
        join('config', '*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}'),
        join('config', '*rc'),
      ],
      {
        absolute: true,
        cwd: basedir,
        dot: true,
        gitignore: true,
        onlyFiles: true,
      },
    ).then(results => {
      Object.assign(
        this.data,
        results.reduce(
          (configs: Record<string, string>, filePath: string) => ({
            ...(configs ?? {}),
            [basename(normalize(filePath))]: normalize(filePath),
          }),
          this.data,
        ),
      )
    })

    return this
  }
}
