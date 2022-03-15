import {globby} from '@roots/bud-support'
import {posix, sep as slash} from 'node:path'

export class Disk {
  public constructor(
    public projectDir: string,
    public config: Record<string, any> = {},
  ) {}

  public async findConfigs(): Promise<Disk> {
    const search = await globby.globby(
      [
        `*.json`,
        `*.yml`,
        `*.toml`,
        `*.ts`,
        `*.js`,
        `*config*`,
        `*rc`,
        `*lint*`,
        `package.json`,
        posix.join(`config`, `*.{ts,js,json,yml}`),
        `!node_modules`,
      ],
      {
        absolute: true,
        cwd: this.projectDir,
        dot: true,
        gitignore: true,
        onlyFiles: true,
      },
    )

    this.config = search.reduce(
      (configs: Record<string, string>, filePath: string) => ({
        ...configs,
        [`${filePath.split(this.projectDir.concat(slash)).pop()}`]:
          filePath,
      }),
      this.config,
    )

    return this
  }
}
