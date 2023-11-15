import {join} from 'path'

import {path} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import {execa, type ExecaReturnValue} from 'execa'
import fs from 'fs-jetpack'
import stripAnsi from 'strip-ansi'

interface Options {
  buildCommand?: [string, Array<string>?]
  dist?: string
  label: string
  projectDir?: string
}

interface Entrypoints {
  [key: string]: {
    css: Array<string>
    dependencies?: Array<string>
    js: Array<string>
  }
}

class Project {
  /**
   * Compiled modules keyed by asset name
   */
  public assets: Record<string, string> = {}

  /**
   * entrypoints.json contents
   */
  public entrypoints: Entrypoints = {}

  /**
   * manifest.json contents
   */
  public manifest: Record<string, any> = {}

  /**
   * Class constructor
   */
  public constructor(public options: Options) {}

  /**
   * Build the project
   */
  @bind
  public async build() {
    await fs.removeAsync(this.getPath(this.getBaseUrl()))
    await fs.removeAsync(this.getPath(`build.stdout.log`))
    await fs.removeAsync(this.getPath(`build.stderr.log`))

    let results: ExecaReturnValue

    if (this.options.buildCommand) {
      results = await execa(...this.options.buildCommand, {
        cwd: this.directory,
      })
    } else if (globalThis.__INTEGRATION__) {
      await execa(
        `node`,
        [this.getPath(`node_modules`, `.bin`, `bud`), `clean`],
        {cwd: this.directory},
      )
      results = await execa(
        `node`,
        [this.getPath(`node_modules`, `.bin`, `bud`), `build`],
        {cwd: this.directory},
      )
    } else {
      await execa(`yarn`, [
        `bud`,
        `--basedir`,
        this.options.label.replace(`@examples/`, `examples/`),
        `clean`,
      ])

      results = await execa(`yarn`, [
        `bud`,
        `--basedir`,
        this.options.label.replace(`@examples/`, `examples/`),
        `build`,
        `--no-update-browserslist`,
      ])
    }

    results.stdout &&
      (await fs.writeAsync(
        this.getPath(`build.stdout.log`),
        stripAnsi(results.stdout),
      ))

    results.stderr &&
      (await fs.writeAsync(
        this.getPath(`build.stderr.log`),
        stripAnsi(results.stderr),
      ))

    this.entrypoints = await fs.readAsync(
      this.getPath(this.getBaseUrl(), `entrypoints.json`),
      `json`,
    )

    this.manifest = await fs.readAsync(
      this.getPath(this.getBaseUrl(), `manifest.json`),
      `json`,
    )

    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          this.assets[name] = await fs.readAsync(
            this.getPath(this.getBaseUrl(), path),
            `utf8`,
          )
        },
      ),
    )

    return this
  }

  /**
   * Get the project directory
   */
  public get directory(): string {
    if (this.options.projectDir) return path(this.options.projectDir)

    if (globalThis.__INTEGRATION__) {
      return path(
        `storage`,
        `fixtures`,
        this.options.label.replace(`@examples/`, ``),
      )
    }

    return path(this.options.label.replace(`@examples/`, `examples/`))
  }

  /**
   * Get an asset by name
   */
  @bind
  public getAsset(name: string) {
    return this.assets[name]
  }

  @bind
  public getAssetPath(name: string) {
    return this.getPath(this.manifest[name])
  }

  /**
   * Get base url
   */
  @bind
  public getBaseUrl() {
    return this.options.dist ?? `dist`
  }

  /**
   * Get an entrypoint by name
   */
  @bind
  public getEntrypoint(name: string) {
    return this.entrypoints[name]
  }

  /**
   * Get the path to a file in the project
   */
  @bind
  public getPath(...file: Array<string>) {
    return join(this.directory, ...file)
  }

  /**
   * Has asset?
   */
  @bind
  public hasAsset(name: string) {
    return name in this.assets
  }

  /**
   * Has entrypoint?
   */
  @bind
  public hasEntrypoint(name: string) {
    return name in this.entrypoints
  }

  /**
   * Install
   */
  @bind
  public async install(): Promise<this> {
    if (globalThis.__INTEGRATION__ !== true) return this

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

    const packageJson = await fs.readAsync(
      this.getPath(`package.json`),
      `json`,
    )

    packageJson.devDependencies = Object.entries(
      packageJson?.devDependencies ?? {},
    ).reduce(
      (json, [key, value]: [string, string]) => ({
        ...json,
        [key]: value.replace(`workspace:*`, `latest`),
      }),
      {},
    )

    await fs.writeAsync(this.getPath(`package.json`), packageJson)

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
