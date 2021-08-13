import {Command} from '../Command'
import {Option} from 'clipanion'
import {PortablePath, xfs} from '@yarnpkg/fslib'

export class VersionCommand extends Command {
  static paths = [[`kjo`, `version`]]

  public version = Option.String(`-v,--version`, {
    required: false,
  })

  public tag = Option.String(`-t,--tag`, {
    required: false,
  })

  public async execute() {
    const {raw} = await this.getManifest()

    raw.manifest.version = this.version ?? raw.manifest.version
    raw.manifest.tag = this.tag ?? raw.manifest.tag

    xfs.writeJsonSync(
      this.context.cwd.concat('/package.json') as PortablePath,
      raw,
    )

    if (this.version) {
      await this.$(
        `yarn workspaces foreach --no-private version --deferred ${raw.manifest.version}`,
      )
    }

    if (!this.version && !this.tag) {
      console.log(`${raw.manifest.version}`)
    }
  }
}
