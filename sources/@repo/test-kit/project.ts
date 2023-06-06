import {join} from 'node:path'

import {path} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import {execa} from 'execa'
import fs from 'fs-jetpack'

interface Options {
  label: string
  dist?: string
  buildCommand?: [string, Array<string>?]
}

interface Entrypoints {
  [key: string]: {
    js: Array<string>
    css: Array<string>
    dependencies?: Array<string>
  }
}

/**
 * This class is used in integration tests.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    label: '@examples/basic',
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
  /**
   * Manifest assets
   */
  public assets: Record<string, string> = {}

  /**
   * entrypoints.json
   */
  public entrypoints: Entrypoints = {}

  /**
   * manifest.json
   */
  public manifest: Record<string, any> = {}

  /**
   * Directory
   */
  public directory: string

  /**
   * Class constructor
   */
  public constructor(public options: Options) {
    this.directory = path(
      `storage`,
      `fixtures`,
      this.options.label.replace(`@examples/`, ``),
    )
    this.options.dist = this.options.dist ?? `dist`
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

  /**
   * Install and setup integration test fixture
   */
  @bind
  public async install(): Promise<this> {
    /**
     * Clean out existing files
     */
    try {
      await fs.removeAsync(this.directory)
    } catch (e) {
      throw e
    }

    /**
     * Copy fixture files
     */
    try {
      await fs.copyAsync(
        path(`examples`, this.options.label.replace(`@examples/`, ``)),
        this.directory,
        {overwrite: true},
      )
    } catch (e) {
      throw e
    }

    /**
     * Write .npmrc
     */
    try {
      await fs.writeAsync(
        this.projectPath(`.npmrc`),
        `@roots:registry=http://localhost:4873`,
      )
    } catch (e) {
      throw e
    }

    /**
     * Install dependencies
     */
    try {
      const child = await execa(`npm`, [`install`], {
        cwd: this.directory,
      })
      if (child?.stdout) {
        await fs.writeAsync(
          this.projectPath(`install.stdout.log`),
          child.stdout,
        )
      }
      if (child.stderr) {
        await fs.writeAsync(
          this.projectPath(`install.stderr.log`),
          child.stderr,
        )
      }
    } catch (e) {
      throw e
    }

    return this
  }

  /**
   * Build integration test fixture
   */
  @bind
  public async build() {
    /**
     * Construct build command and args (default `bud build`)
     */
    const build = this.options.buildCommand ?? [
      `node`,
      [this.projectPath(`node_modules`, `.bin`, `bud`), `build`],
    ]

    /**
     * Execute build command
     */
    const child = await execa(...build, {
      cwd: this.directory,
    })
    child.stdout &&
      (await fs.writeAsync(
        this.projectPath(`build.stdout.log`),
        child.stdout,
      ))
    child.stderr &&
      (await fs.writeAsync(
        this.projectPath(`build.stderr.log`),
        child.stderr,
      ))

    return this
  }

  /**
   * Get the directory of the integration test fixture
   */
  @bind
  public projectPath(...file: Array<string>) {
    return join(this.directory, ...file)
  }

  /**
   * Assign the `manifest.json` data to {@link this.manifest}
   */
  @bind
  public async setManifest() {
    this.manifest = await fs.readAsync(
      this.projectPath(this.options.dist, `manifest.json`),
      `json`,
    )
  }

  /**
   * Mapped data for {@link this.manifest} entries
   */
  @bind
  public async setAssets(): Promise<void> {
    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          const buffer = await fs.readAsync(
            this.projectPath(this.options.dist, path),
          )

          this.assets[name] = buffer.toString()
        },
        Promise.resolve({}),
      ),
    )
  }

  /**
   * Set the `entrypoints.json` data to {@link this.entrypoints}
   */
  @bind
  public async setEntrypoints() {
    try {
      this.entrypoints = await fs.readAsync(
        this.projectPath(this.options.dist, `entrypoints.json`),
        `json`,
      )
    } catch (e) {
      throw e
    }
  }
}
