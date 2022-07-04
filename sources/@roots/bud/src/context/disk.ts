import {globby} from 'globby'

/**
 * Context: disk
 *
 * @public
 */
export class Disk {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    public dir: string,
    public config: Record<string, string> = {},
  ) {}

  /**
   * Find configs
   *
   * @public
   */
  public async findConfigs(): Promise<Disk> {
    const search = await globby(
      [
        `*.json`,
        `*.yml`,
        `*.toml`,
        `*.ts`,
        `*.js`,
        `*.mjs`,
        `*.cjs`,
        `*config*`,
        `*rc`,
        `*lint*`,
        `package.json`,
        `config/*.{ts,js,json,yml}`,
        `!node_modules/**/*`,
      ],
      {
        absolute: true,
        cwd: this.dir,
        dot: true,
        gitignore: true,
        onlyFiles: true,
      },
    )

    this.config = search.reduce(
      (configs: Record<string, string>, filePath: string) => ({
        ...configs,
        [`${filePath.replace(`${this.dir}/`, '')}`]: filePath,
      }),
      this.config,
    )

    return this
  }
}
