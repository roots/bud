import {globby} from 'globby'
import {basename, join, normalize} from 'node:path/posix'

/**
 * Context: disk
 *
 * @public
 */
export class Disk {
  public config: Record<string, string> = null

  /**
   * Find configs
   *
   * @public
   */
  public async findConfigs(dir: string): Promise<Disk> {
    if (this.config) return this

    const search = await globby(
      [
        `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`,
        `*rc`,
        join('config', '*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}'),
        join('config', '*rc'),
      ],
      {
        absolute: true,
        cwd: dir,
        dot: true,
        gitignore: true,
        onlyFiles: true,
      },
    )

    this.config = search.reduce(
      (configs: Record<string, string>, filePath: string) => ({
        ...configs,
        [basename(normalize(filePath))]: normalize(filePath),
      }),
      this.config,
    )

    return this
  }
}
