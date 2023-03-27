/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import {posix} from 'node:path'

import {paths, REGISTRY_PROXY} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import {Filesystem, json} from '@roots/bud-support/filesystem'
import {execa, ExecaChildProcess} from 'execa'

const {join} = posix

interface Options {
  label: string
  with: 'yarn' | 'npm'
  dist?: string
  mode?: 'development' | 'production'
  buildCommand?: [string, Array<string>]
}

/**
 * This class is used to represent an example project being used
 * as the subject of an integration test.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    name: 'basic',
 *    with: 'yarn',
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

  public modules: {
    chunks: {
      byName: any
      bySource: any
    }
  }

  public packageJson: Record<string, any> = {}

  /**
   * dir
   */
  public dir: string

  public fs: Filesystem

  /**
   * Class constructor
   */
  public constructor(public options: Options) {
    this.dir = join(paths.mocks, this.options.with, this.options.label)
    this.options.dist = this.options.dist ?? `dist`
    this.fs = new Filesystem(this.dir)
  }

  /**
   * setup project
   */
  @bind
  public async setup(): Promise<Project> {
    await this.install()
    await this.build()

    await this.setPackageJson()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()

    return this
  }

  @bind
  public async $(
    bin: string,
    flags: Array<string>,
  ): Promise<ExecaChildProcess> {
    try {
      return execa(bin, flags ?? [], {
        cwd: this.projectPath(),
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  @bind
  public async yarnInstall() {
    await this.fs.write(this.projectPath(`yarn.lock`), ``)

    await this.fs.copy(
      join(paths.sources, `@repo`, `test-kit`, `.yarnrc.stub.yml`),
      this.projectPath(`.yarnrc.yml`),
    )

    const child = await this.$(`yarn`, [
      `install`,
      `--registry`,
      REGISTRY_PROXY,
      `--no-lockfile`,
      `--no-cache`,
      `--no-verify`,
    ])

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
  }

  @bind
  public async npmInstall() {
    const child = await this.$(`npm`, [
      `install`,
      `--registry`,
      REGISTRY_PROXY,
    ])

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
  }

  @bind
  public async install(): Promise<this> {
    try {
      await this.fs.remove(this.projectPath())
    } catch (e) {}
    try {
      await this.fs.copy(
        `./examples/${this.options.label.replace(`@examples/`, ``)}`,
        this.projectPath(),
      )
    } catch (e) {}

    this.options.with === `yarn`
      ? await this.yarnInstall()
      : await this.npmInstall()

    return this
  }

  @bind
  public async build() {
    const child = this.options.buildCommand
      ? await this.$(...this.options.buildCommand)
      : await this.$(`node`, [
          this.projectPath(`node_modules`, `.bin`, `bud`),
          this.options.mode
            ? this.options.mode === `production`
              ? `build`
              : `dev`
            : `build`,
        ])

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
    return join(this.dir, ...file)
  }

  @bind
  public async readJson(file: string) {
    const buffer = await this.fs.read(file)
    return json.parse(buffer.toString())
  }

  @bind
  public async setPackageJson() {
    const packageJson = await this.readJson(
      this.projectPath(`package.json`),
    )

    Object.assign(this, {packageJson})
  }

  @bind
  public async setManifest() {
    this.manifest = await this.readJson(
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
      const entrypoints = await this.readJson(
        this.projectPath(join(this.options.dist, `entrypoints.json`)),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  @bind
  public async setModules() {
    try {
      const modules = await this.readJson(
        this.projectPath(
          join(`.budfiles`, this.options.label, `modules.json`),
        ),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }
}
