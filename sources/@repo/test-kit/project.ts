/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import {posix} from 'node:path'

import {paths, REGISTRY_PROXY} from '@repo/constants'
import {execa, ExecaChildProcess} from 'execa'
import * as fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import json5 from 'json5'

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
 *
 * @internal
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
   *
   * @public
   */
  public dir: string

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public options: Options) {
    this.dir = join(paths.mocks, this.options.with, this.options.label)
    this.options.dist = this.options.dist ?? `dist`
  }

  /**
   * setup project
   *
   * @public
   * @decorator `@bind`
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
    await fs.ensureFile(this.projectPath(`yarn.lock`))

    await fs.copy(
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
      (await fs.writeFile(
        this.projectPath(`install.stdout.log`),
        child.stdout,
        `utf8`,
      ))
    child.stderr &&
      (await fs.writeFile(
        this.projectPath(`install.stderr.log`),
        child.stderr,
        `utf8`,
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
      (await fs.writeFile(
        this.projectPath(`install.stdout.log`),
        child.stdout,
        `utf8`,
      ))
    child.stderr &&
      (await fs.writeFile(
        this.projectPath(`install.stderr.log`),
        child.stderr,
        `utf8`,
      ))
  }

  @bind
  public async install(): Promise<this> {
    try {
      await fs.remove(this.projectPath())
    } catch (e) {}
    try {
      await fs.copy(
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
      (await fs.writeFile(
        this.projectPath(`build.stdout.log`),
        child.stdout,
        `utf8`,
      ))
    child.stderr &&
      (await fs.writeFile(
        this.projectPath(`build.stderr.log`),
        child.stderr,
        `utf8`,
      ))

    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public projectPath(...file: Array<string>) {
    return join(this.dir, ...file)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async readJson(file: string) {
    const buffer = await fs.readFile(file)
    return json5.parse(buffer.toString())
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setPackageJson() {
    const packageJson = await this.readJson(
      this.projectPath(`package.json`),
    )

    Object.assign(this, {packageJson})
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setManifest() {
    this.manifest = await this.readJson(
      this.projectPath(this.options.dist, `manifest.json`),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setAssets(): Promise<void> {
    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          const buffer = await fs.readFile(
            this.projectPath(this.options.dist, path),
          )

          this.assets[name] = buffer.toString()
        },
        Promise.resolve({}),
      ),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setEntrypoints() {
    try {
      const entrypoints = await this.readJson(
        this.projectPath(join(this.options.dist, `entrypoints.json`)),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  /**
   * @public
   * @decorator `@bind`
   */
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
