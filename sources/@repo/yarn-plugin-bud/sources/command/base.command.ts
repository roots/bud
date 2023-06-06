/* eslint-disable n/no-process-env */
import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'
import {bind} from 'helpful-decorators'
import ora, {Ora} from 'ora'

/**
 * Base class
 */
export abstract class Command extends BaseCommand {
  /**
   * Command paths
   */
  public name: string

  /**
   * Spinner
   */
  public spinner: Ora

  /**
   * Variadic arguments
   */
  public passthrough?: Array<string>

  /**
   * Get manifest contents
   */
  @bind
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Get project configuration
   */
  @bind
  public async getConfiguration() {
    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins,
    )

    return configuration
  }

  /**
   * Get project info
   */
  @bind
  public async getProject() {
    const {project} = await Project.find(
      await this.getConfiguration(),
      this.context.cwd,
    )
    return project
  }

  /**
   * Append passthrough arguments to the command
   */
  @bind
  public withPassthrough(str: string): string {
    return this.passthrough.length
      ? this.passthrough.reduce((a, c) => (!c ? `${a}` : `${a} ${c}`), str)
      : str
  }

  /**
   * Logs message to process.stdout
   */
  @bind
  public log(...messages: Array<string>): void {
    const label = this.name ?? `@bud`
    messages.map(message =>
      process.stdout.write(`[${label}] ${message}\n`),
    )
  }

  public async useLocalRegistry() {
    await this.$([
      `yarn`,
      [`config`, `set`, `npmPublishRegistry`, `http://localhost:4873`],
    ])
    await this.$([
      `yarn`,
      [`config`, `set`, `npmRegistryServer`, `http://localhost:4873`],
    ])
  }

  public async useNpmRegistry() {
    await this.$([
      `yarn`,
      [
        `config`,
        `set`,
        `npmPublishRegistry`,
        `https://registry.npmjs.org`,
      ],
    ])
    await this.$([
      `yarn`,
      [`config`, `set`, `npmRegistryServer`, `https://registry.npmjs.org`],
    ])
  }

  /**
   * Execute a series of tasks
   */
  @bind
  public async $(
    ...tasks: Array<string | [string, Array<string>]>
  ): Promise<number> {
    let code = 0

    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        const [bin, args] = Array.isArray(task) ? task : [task, []]

        const ident = `${bin} ${args?.join(` `)} `.replace(
          project.cwd,
          `.`,
        )

        const listener = data => {
          if (!data) return data
          this.spinner.text = `${data.toString()}`
        }

        this.context.stdout.prependListener(`data`, listener)
        this.context.stderr.prependListener(`data`, listener)

        this.spinner = ora()
        this.spinner.start(ident)

        try {
          code = await execute(bin, args, {
            cwd: project.cwd,
          })

          if (code !== 0) {
            throw new Error(`failed with code ${code}`)
          }

          this.spinner.succeed()
          this.context.stdout.write(`\n`)
          this.context.stdout.removeListener(`data`, listener)
          return
        } catch (e) {
          this.spinner.fail()
          this.context.stdout.write(`\n`)
          this.context.stdout.removeListener(`data`, listener)
          throw e
        }
      }),
    )

    return code
  }
}
