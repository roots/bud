/* eslint-disable no-console */
import {posix} from 'node:path'

import {paths} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import execa, {ExecaChildProcess} from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'

const {join} = posix

interface Options {
  label: string
  dist?: string
  mode?: 'development' | 'production'
  buildCommand?: [string, Array<string>?]
}

/**
 * This class is used in integration tests.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    name: 'basic',
 *  })

 *  await project.setup()
 *
 *  ...
 *  expect(project.packageJson).toMatchSnapshot()
 *  expect(project.assets['main.js'].length).toBeGreaterThan(10)
 *  ...
 * ```
 */
export class Project {
  public assets = {}

  public entrypoints: {
    [key: string]: {
      js: Array<string>
      css: Array<string>
      dependencies?: Array<string>
    }
  } = {}

  public manifest: {[key: string]: any} = {}

  /**
   * dir
   */
  public directory: string

  public fs: Filesystem

  /**
   * Class constructor
   */
  public constructor(public options: Options) {
    this.directory = join(
      paths.fixtures,
      this.options.label.replace(`@examples/`, ``),
    )
    this.options.dist = this.options.dist ?? `dist`
    this.fs = new Filesystem()
  }

  /**
   * setup project
   */
  @bind
  public async setup(): Promise<Project> {
    await this.install()
    await this.build()
    await this.setManifest()
    await this.setAssets()
    await this.setEntrypoints()

    return this
  }

  @bind
  public async $(
    bin: string,
    flags: Array<string>,
  ): Promise<ExecaChildProcess> {
    try {
      return execa(bin, flags ?? [], {cwd: this.projectPath()})
    } catch (error) {
      throw new Error(error)
    }
  }

  @bind
  public async install(): Promise<this> {
    try {
      await this.fs.copy(
        join(
          paths.root,
          `examples`,
          this.options.label.replace(`@examples/`, ``),
        ),
        this.projectPath(),
        {overwrite: true},
      )
    } catch (e) {}

    await this.fs.write(
      this.projectPath(`.npmrc`),
      `@roots:registry=http://localhost:4873\nnpm_config_force=true\n`,
    )

    const child = await this.$(`npm`, [`install`])

    child.stdout &&
      (await this.fs.write(
        this.projectPath(`install.stdout.log`),
        child.stdout,
      ))

    child.stderr &&
      (await this.fs.write(
        this.projectPath(`install.stderr.log`),
        child.stderr,
      ))

    return this
  }

  @bind
  public async build() {
    this.options.buildCommand = this.options.buildCommand ?? [
      `node`,
      [this.projectPath(`node_modules`, `.bin`, `bud`), `build`],
    ]

    const child = await this.$(...this.options?.buildCommand)

    child.stdout &&
      (await this.fs.write(
        this.projectPath(`build.stdout.log`),
        child.stdout,
      ))
    child.stderr &&
      (await this.fs.write(
        this.projectPath(`build.stderr.log`),
        child.stderr,
      ))

    return this
  }

  @bind
  public projectPath(...file: Array<string>) {
    return join(this.directory, ...file)
  }

  @bind
  public async setManifest() {
    this.manifest = await this.fs.read(
      this.projectPath(this.options.dist, `manifest.json`),
    )
  }

  @bind
  public async setAssets(): Promise<void> {
    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          const buffer = await this.fs.read(
            this.projectPath(this.options.dist, path),
          )

          this.assets[name] = buffer.toString()
        },
        Promise.resolve({}),
      ),
    )
  }

  @bind
  public async setEntrypoints() {
    try {
      const entrypoints = await this.fs.read(
        this.projectPath(join(this.options.dist, `entrypoints.json`)),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }
}
