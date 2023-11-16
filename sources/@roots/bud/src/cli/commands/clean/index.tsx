import type {Bud} from '@roots/bud'

import BudCommand from '@roots/bud/cli/commands'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, Text} from '@roots/bud-support/ink'
import logger from '@roots/bud-support/logger'

/**
 * `bud clean`
 */
export default class BudCleanCommand extends BudCommand {
  public static override paths = [[`clean`]]

  public static override usage = Command.Usage({
    category: `task`,
    description: `Clean project artifacts and caches`,
    details: `
      \`bud clean\` empties the \`@dist\` and \`@storage\` directories.
      \`bud clean @dist\` empties the \`@dist\` directory.
      \`bud clean @storage\` empties the \`@storage\` directory.
      \`bud clean cache\` empties the \`@storage/cache\` directory.
`,
    examples: [
      [`Clean all`, `$0 clean`],
      [`Clean dist`, `$0 clean output`],
      [`Clean storage`, `$0 clean storage`],
    ],
  })

  public cleaned = []

  public override cache = false

  public override force = true

  public cachePositional = Option.Boolean(`@cache,cache`, false, {
    description: `empty @cache`,
  })

  public outputPositional = Option.Boolean(`@dist,dist,output`, false, {
    description: `empty @dist`,
  })

  public storagePositional = Option.Boolean(`@storage,storage`, false, {
    description: `empty @storage`,
  })

  @bind
  public override async catch(error: Error) {
    logger.warn(error)
  }

  @bind
  public async cleanCache() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            if (await this.bud.fs.exists(child.cache.cacheDirectory)) {
              await this.bud.fs.remove(child.cache.cacheDirectory)
              this.cleaned.push(child.cache.cacheDirectory)
            }
          }),
      )
    }

    if (await this.bud.fs.exists(this.bud.cache.cacheDirectory)) {
      await this.bud.fs.remove(this.bud.cache.cacheDirectory)
      this.cleaned.push(this.bud.cache.cacheDirectory)
    }
  }

  @bind
  public async cleanOutput() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            if (await this.bud.fs.exists(child.path(`@dist`))) {
              await this.bud.fs.remove(child.path(`@dist`))
              this.cleaned.push(child.path(`@dist`))
            }
          }),
      )
    }

    if (await this.bud.fs.exists(this.bud.path(`@dist`))) {
      await this.bud.fs.remove(this.bud.path(`@dist`))
      this.cleaned.push(this.bud.path(`@dist`))
    }
  }

  @bind
  public async cleanStorage() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            if (await this.bud.fs.exists(child.path(`@storage`))) {
              await this.bud.fs.remove(child.path(`@storage`))
              this.cleaned.push(child.path(`@storage`))
            }
          }),
      )
    }

    if (await this.bud.fs.exists(this.bud.path(`@storage`))) {
      await this.bud.fs.remove(this.bud.path(`@storage`))
      this.cleaned.push(this.bud.path(`@storage`))
    }
  }

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud().catch(this.catch)

    const cleanAll =
      !this.outputPositional &&
      !this.storagePositional &&
      !this.cachePositional

    if (this.storagePositional || cleanAll) {
      await this.cleanStorage()
    }

    if (this.outputPositional || cleanAll) {
      await this.cleanOutput()
    }

    if (this.cachePositional || cleanAll) {
      await this.cleanCache()
    }

    this.renderStatic(
      <Box flexDirection="column">
        {this.cleaned.map((path, id) => (
          <Box key={id}>
            <Text color="green">✔ emptied {path}</Text>
          </Box>
        ))}
      </Box>,
    )
  }

  @bind
  public filterCompiler(child: Bud): boolean {
    return !this.filter || this.filter.includes(child.label)
  }
}
