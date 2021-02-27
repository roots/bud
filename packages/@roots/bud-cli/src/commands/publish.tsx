import {React, render, fs} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'
import BaseCommand from '../Command'
import List from './publish-list'

/**
 * Publish
 */
export default class Command extends BaseCommand {
  public name = 'publish'

  public description = `Publish a file to your project.`

  public signature = `<pkg> <scaffold> [dir]`

  public arguments = {
    pkg: 'Source package',
    scaffold: 'File to publish',
    dir: 'Path to publish to',
  }

  public subcommands = [List]

  public action({pkg, scaffold, dir}) {
    if (!pkg || !scaffold) {
      Error(
        `You must specify a [pkg] and [scaffold] argument ${this.instance.helpInformation()}`,
        `CLI argument error\n\n`,
      )
    }

    ;(async () => {
      const src = join(
        process.cwd(),
        'node_modules',
        pkg,
        'publish',
        scaffold,
      )

      const dest = join(
        process.cwd(),
        dir ?? `publish`,
        scaffold,
      )

      try {
        await fs.ensureDir(dirname(dest))
        await fs.copyFile(src, dest)

        render(<Publish file={scaffold} />)
      } catch (err) {
        console.log(err)

        Error(
          `Are you sure you got the name right? Try \`bud publish:list\` for a list of available files.`,
          `The requested file can't be published.`,
        )
      }
    })()
  }
}
