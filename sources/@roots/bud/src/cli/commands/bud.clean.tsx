import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import storage from '@roots/bud/cli/flags/storage'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import * as Ink from '@roots/bud-support/ink'

/**
 * `bud clean`
 */
@dry
export default class BudCleanCommand extends BudCommand {
  public static override paths = [[`clean`]]

  public static override usage = Command.Usage({
    category: `tasks`,
    description: `Clean project artifacts and caches`,
    details: `
      \`bud clean\` empties the \`@dist\` and \`@storage\` directories.
      \`bud clean @dist\` empties the \`@dist\` directory.
      \`bud clean @storage\` empties the \`@storage\` directory.
      \`bud clean cache\` empties the \`@storage/cache\` directory.
`,
    examples: [
      [`Clean artifacts/caches`, `$0 clean`],
      [`Clean dist`, `$0 clean @dist`],
      [`Clean storage`, `$0 clean @storage`],
    ],
  })

  public storage = storage

  public storagePositional = Option.Boolean(`@storage,storage`, false, {
    description: `empty @storage`,
  })
  public outputPositional = Option.Boolean(`@dist,dist,output`, false, {
    description: `empty @dist`,
  })
  public cachePositional = Option.Boolean(`@cache,cache`, false, {
    description: `empty @cache`,
  })

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.healthcheck(this)

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

  @bind
  public async cleanOutput() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            await this.bud.fs.remove(child.path(`@dist`))
            await this.renderStatic(
              <Ink.Box>
                <Ink.Text color="green">
                  ✔ emptied {child.path(`@dist`)}
                </Ink.Text>
              </Ink.Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@dist`))
    await this.renderStatic(
      <Ink.Box>
        <Ink.Text color="green">
          ✔ emptied {this.bud.path(`@dist`)}
        </Ink.Text>
      </Ink.Box>,
    )
  }

  @bind
  public async cleanCache() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            await this.bud.fs.remove(child.cache.cacheDirectory)
            await this.renderStatic(
              <Ink.Box>
                <Ink.Text color="green">
                  ✔ emptied {child.cache.cacheDirectory}
                </Ink.Text>
              </Ink.Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@os-cache`))

    await this.renderStatic(
      <Ink.Box>
        <Ink.Text color="green">
          ✔ emptied {this.bud.cache.cacheDirectory}
        </Ink.Text>
      </Ink.Box>,
    )

    await this.bud.fs.remove(this.bud.path(`@storage`, `conf`))

    await this.renderStatic(
      <Ink.Box>
        <Ink.Text color="green">
          ✔ emptied {this.bud.path(`@storage`, `conf`)}
        </Ink.Text>
      </Ink.Box>,
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
            await this.renderStatic(
              <Ink.Box>
                <Ink.Text color="green">
                  ✔ emptied {child.path(`@storage`)}
                </Ink.Text>
              </Ink.Box>,
            )
          }),
      )
    }

    await this.bud.fs.remove(this.bud.path(`@storage`))
    await this.bud.fs.remove(this.bud.path(`@os-cache`))

    await this.renderStatic(
      <Ink.Box>
        <Ink.Text color="green">
          ✔ emptied {this.bud.path(`@storage`)}
        </Ink.Text>
      </Ink.Box>,
    )
  }
}
