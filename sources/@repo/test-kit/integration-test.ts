import {path} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {join} from 'node:path'

interface Options {
  buildCommand?: [string, Array<string>?]
  dist?: string
  label: string
}

interface Entrypoints {
  [key: string]: {
    css: Array<string>
    dependencies?: Array<string>
    js: Array<string>
  }
}

class Project {
  public assets: Record<string, string> = {}

  public entrypoints: Entrypoints = {}

  public manifest: Record<string, any> = {}

  public constructor(public options: Options) {}

  @bind
  public async build() {
    const build = this.options.buildCommand ?? [
      `node`,
      [this.path(`node_modules`, `.bin`, `bud`), `build`],
    ]

    const {stderr, stdout} = await execa(...build, {cwd: this.directory})
    stdout && (await fs.writeAsync(this.path(`build.stdout.log`), stdout))
    stderr && (await fs.writeAsync(this.path(`build.stderr.log`), stderr))

    await Promise.all([
      async () => {
        this.manifest = await fs.readAsync(
          this.path(this.options.dist, `manifest.json`),
          `json`,
        )
      },
      async () => {
        this.entrypoints = await fs.readAsync(
          this.path(this.options.dist, `entrypoints.json`),
          `json`,
        )
      },
    ])

    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          this.assets[name] = await fs.readAsync(
            this.path(this.options.dist, path),
            `utf8`,
          )
        },
      ),
    )

    return this
  }

  public get directory(): string {
    return path(
      `storage`,
      `fixtures`,
      this.options.label.replace(`@examples/`, ``),
    )
  }

  @bind
  public async install(): Promise<this> {
    try {
      await fs.removeAsync(this.directory)
      await fs.copyAsync(
        path(`examples`, this.options.label.replace(`@examples/`, ``)),
        this.directory,
        {overwrite: true},
      )
      await fs.writeAsync(
        this.path(`.npmrc`),
        `@roots:registry=http://localhost:4873`,
      )

      const child = await execa(`npm`, [`install`], {
        cwd: this.directory,
      })
      if (child?.stdout) {
        await fs.writeAsync(this.path(`install.stdout.log`), child.stdout)
      }

      if (child.stderr) {
        await fs.writeAsync(this.path(`install.stderr.log`), child.stderr)
      }
    } catch (e) {
      throw e
    }

    return this
  }

  @bind
  public path(...file: Array<string>) {
    return join(this.directory, ...file)
  }
}

export {Project as default}
export type {Entrypoints, Options}
