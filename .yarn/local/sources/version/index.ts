import {Command} from '../Command'
import {Option} from 'clipanion'
import {PortablePath, xfs} from '@yarnpkg/fslib'
import {Manifest} from '@yarnpkg/core'
import {Version, V} from './Version'

export class VersionCommand extends Command {
  static paths = [[`kjo`, `version`]]

  public version = Option.String(`-v,--version`, {
    required: false,
  })
  public major = Option.String(`--major`, {
    required: false,
  })
  public minor = Option.String(`--minor`, {
    required: false,
  })
  public patch = Option.String(`--patch`, {
    required: false,
  })
  public tag = Option.String(`-t,--tag`, {
    required: false,
  })
  public increment = Option.String(`-i,--increment`, {
    required: false,
  })
  public set = Option.Boolean(`-s,--set`, {
    required: false,
  })
  public publish = Option.Boolean(`-p,--publish`, {
    required: false,
  })

  public async execute() {
    /**
     * Write version to package.json manifest.version key
     */
    let {raw} = await Manifest.tryFind(this.context.cwd)

    let version: Version

    if (this.version) {
      version = new Version(this.version)
    } else {
      version = new Version(raw.manifest.version)
    }

    if (this.major) version.major = this.major
    if (this.minor) version.minor = this.minor
    if (this.patch) version.patch = this.patch
    if (this.increment) version.increment = this.increment
    if (this.tag) version.setTag(this.tag)

    raw.manifest.version = version.string

    /**
     * Set version
     */
    if (this.set) {
      xfs.writeJsonSync(
        this.context.cwd.concat('/package.json') as PortablePath,
        raw,
      )

      process.exit()

      await this.$(version.setCommand)
      return
    }

    /**
     * Publish
     */
    if (this.publish) {
      console.log(
        `I want to publish version ${version.string}, tagged ${version.tag}`,
      )

      return
    }

    /**
     * Fallthrough: display version
     */
    console.log(`${version.string}`)
  }
}
