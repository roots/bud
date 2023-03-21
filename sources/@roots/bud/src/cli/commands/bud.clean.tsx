import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {ensureDir, remove} from '@roots/bud-support/fs'
import * as Ink from 'ink'

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

  public _cleanStorage = Option.Boolean(`@storage,storage`, false, {
    description: `empty @storage`,
  })
  public _cleanOutput = Option.Boolean(`@dist,dist,output`, false, {
    description: `empty @dist`,
  })
  public _cleanCache = Option.Boolean(`@cache,cache`, false, {
    description: `empty @storage/cache`,
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud(this)
    await this.healthcheck(this)

    const cleanAll =
      !this._cleanOutput && !this._cleanOutput && !this._cleanCache

    if (this._cleanStorage || cleanAll) {
      await this.cleanStorage()
    }

    if (this._cleanOutput || cleanAll) {
      await this.cleanOutput()
    }

    if (this._cleanCache || cleanAll) {
      await this.cleanCache()
    }
  }

  @bind
  public filterCompiler(child: Bud): boolean {
    return !this.filter || this.filter.includes(child.label)
  }

  @bind
  public async cleanOutput() {
    try {
      if (this.bud.hasChildren) {
        return await Promise.all(
          Object.values(this.bud.children)
            .filter(this.filterCompiler)
            .map(async child => {
              try {
                await remove(child.path(`@dist`))
                await this.renderOnce(
                  <Ink.Box>
                    <Ink.Text color="green">
                      ✔ emptied {child.path(`@dist`)}
                    </Ink.Text>
                  </Ink.Box>,
                )
              } catch (error) {
                throw error
              }
            }),
        )
      }

      await remove(this.bud.path(`@dist`))
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✔ emptied {this.bud.path(`@dist`)}
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      throw error
    }
  }

  @bind
  public async cleanCache() {
    try {
      if (this.bud.hasChildren) {
        return await Promise.all(
          Object.values(this.bud.children)
            .filter(this.filterCompiler)
            .map(async child => {
              try {
                await remove(child.cache.cacheDirectory)
                await this.renderOnce(
                  <Ink.Box>
                    <Ink.Text color="green">
                      ✔ emptied {child.cache.cacheDirectory}
                    </Ink.Text>
                  </Ink.Box>,
                )
              } catch (error) {
                throw error
              }
            }),
        )
      }

      await remove(this.bud.cache.cacheDirectory)
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✔ emptied {this.bud.cache.cacheDirectory}
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      throw error
    }
  }

  @bind
  public async cleanStorage() {
    if (this.bud.hasChildren) {
      return await Promise.all(
        Object.values(this.bud.children)
          .filter(this.filterCompiler)
          .map(async child => {
            try {
              await remove(child.path(`@dist`))
              await this.renderOnce(
                <Ink.Box>
                  <Ink.Text color="green">
                    ✔ emptied {child.path(`@storage`)}
                  </Ink.Text>
                </Ink.Box>,
              )
            } catch (error) {
              throw error
            }
          }),
      )
    }

    try {
      await ensureDir(this.bud.path(`@storage`))
      await remove(this.bud.path(`@storage`))
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✔ emptied {this.bud.path(`@storage`)}
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      throw error
    }
  }
}
