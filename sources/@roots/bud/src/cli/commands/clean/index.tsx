import type {Bud} from '@roots/bud'

import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, Text} from '@roots/bud-support/ink'
import BudCommand from '@roots/bud/cli/commands'

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
  public override async catch(error: Error) {}

  @bind
  public async cleanCache() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            await this.bud.fs.remove(child.cache.cacheDirectory)
            BudCleanCommand.renderStatic(
              <Box>
                <Text color="green">
                  ✔ emptied {child.cache.cacheDirectory}
                </Text>
              </Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@os-cache`))

    BudCleanCommand.renderStatic(
      <Box>
        <Text color="green">
          ✔ emptied {this.bud.cache.cacheDirectory}
        </Text>
      </Box>,
    )

    await this.bud.fs.remove(this.bud.path(`@storage`, `conf`))

    BudCleanCommand.renderStatic(
      <Box>
        <Text color="green">
          ✔ emptied {this.bud.path(`@storage`, `conf`)}
        </Text>
      </Box>,
    )
  }

  @bind
  public async cleanOutput() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            await this.bud.fs.remove(child.path(`@dist`))
            BudCleanCommand.renderStatic(
              <Box>
                <Text color="green">✔ emptied {child.path(`@dist`)}</Text>
              </Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@dist`))
    BudCleanCommand.renderStatic(
      <Box>
        <Text color="green">✔ emptied {this.bud.path(`@dist`)}</Text>
      </Box>,
    )
  }

  @bind
  public async cleanStorage() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            await this.bud.fs.remove(child.path(`@storage`))
            BudCleanCommand.renderStatic(
              <Box>
                <Text color="green">
                  ✔ emptied {child.path(`@storage`)}
                </Text>
              </Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@storage`))
    await this.bud.fs.remove(this.bud.path(`@os-cache`))

    BudCleanCommand.renderStatic(
      <Box>
        <Text color="green">✔ emptied {this.bud.path(`@storage`)}</Text>
      </Box>,
    )
  }

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()

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
  }

  @bind
  public filterCompiler(child: Bud): boolean {
    return !this.filter || this.filter.includes(child.label)
  }
}
