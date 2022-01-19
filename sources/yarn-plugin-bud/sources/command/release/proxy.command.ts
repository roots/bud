import {CommandClass} from 'clipanion'
import {readJson, remove, writeJson} from 'fs-extra'
import {ROOTS_PATH} from '../../constants'
import {ReleaseNpm} from './npm.command'

/**
 * Release command
 *
 * @internal
 */
export class ReleaseProxy extends ReleaseNpm {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'release proxy'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `release`, `proxy`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `do a proxy release`,
    examples: [
      [
        `yarn @bud release proxy --tag latest`,
        `Bump packages to x.y.z and publish to local proxy`,
      ],
      [
        `yarn @bud release proxy --version x.y.z --tag latest`,
        `Bump packages to x.y.z, tag 'latest', and publish to local proxy`,
      ],
    ],
  }

  /**
   * execute command
   *
   * @remarks
   * You must be in the roots staff channel to see this link. It is
   * just a broader overview of the steps.
   *
   * @internal
   */
  public async execute() {
    await this.executeStep(`make`)
    await this.executeStep(`prepublish`)
    await this.executeStep(`publish`)
  }

  /**
   * build packages
   *
   * @internal
   */
  public async make() {
    await this.$(`yarn install --immutable`)
    await this.$(`yarn @bud build`)
  }

  /**
   * prepublish
   *
   * @remarks
   * Crudely reset verdaccio db
   *
   * @internal
   */
  public async prepublish() {
    const verdaccioDb = await readJson(
      `${ROOTS_PATH}/verdaccio/.verdaccio-db.json`,
    )

    verdaccioDb.list = []

    await writeJson(
      `${ROOTS_PATH}/verdaccio/.verdaccio-db.json`,
      verdaccioDb,
    )

    await remove(`${ROOTS_PATH}/verdaccio/@roots`)
  }
}
