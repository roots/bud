import {join} from 'path'

import {path} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import {execa} from 'execa'
import fs from 'fs-jetpack'

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
      [this.getPath(`node_modules`, `.bin`, `bud`), `build`],
    ]

    const {stderr, stdout} = await execa(...build, {cwd: this.directory})
    stdout &&
      (await fs.writeAsync(this.getPath(`build.stdout.log`), stdout))
    stderr &&
      (await fs.writeAsync(this.getPath(`build.stderr.log`), stderr))

    this.entrypoints = await fs.readAsync(
      this.getPath(this.options.dist ?? `dist`, `entrypoints.json`),
      `json`,
    )

    this.manifest = await fs.readAsync(
      this.getPath(this.options.dist ?? `dist`, `manifest.json`),
      `json`,
    )

    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          this.assets[name] = await fs.readAsync(
            this.getPath(this.options.dist ?? `dist`, path),
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
  public getAsset(name: string) {
    return this.assets[name]
  }

  @bind
  public getEntrypoint(name: string) {
    return this.entrypoints[name]
  }

  @bind
  public getPath(...file: Array<string>) {
    return join(this.directory, ...file)
  }

  @bind
  public hasAsset(name: string) {
    return name in this.assets
  }

  @bind
  public hasEntrypoint(name: string) {
    return name in this.entrypoints
  }

  @bind
  public async install(): Promise<this> {
    await fs.removeAsync(this.directory).catch(error => {
      throw error
    })

    await fs
      .copyAsync(
        path(`examples`, this.options.label.replace(`@examples/`, ``)),
        this.directory,
        {overwrite: true},
      )
      .catch(error => {
        throw error
      })

    await fs
      .writeAsync(
        this.getPath(`.npmrc`),
        `registry=http://localhost:4873/`,
      )
      .catch(error => {
        throw error
      })

    await execa(`npm`, [`install`, `--registry=http://localhost:4873/`], {
      cwd: this.directory,
      env: {NODE_ENV: `development`},
    })
      .then(async result => {
        if (result?.stdout)
          await fs.writeAsync(
            this.getPath(`install.stdout.log`),
            result.stdout,
          )
        if (result?.stderr)
          await fs.writeAsync(
            this.getPath(`install.stderr.log`),
            result.stderr,
          )

        if (result?.exitCode !== 0) throw new Error(`npm install failed`)
      })
      .catch(async error => {
        await fs.writeAsync(
          this.getPath(`install.error.log`),
          error.stderr,
        )
        throw error
      })

    return this
  }
}

export {Project as default}
export type {Entrypoints, Options}
