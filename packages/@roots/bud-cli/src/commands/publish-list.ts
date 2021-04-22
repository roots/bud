import {Command} from '../Command'
import chalk from 'chalk'
import globby from 'globby'
import {dirname} from 'path'

/**
 * Publish
 */
export class PublishList extends Command {
  public name = 'publish:list'

  public description = 'List available publishable files.'

  public action() {
    const publishables = this.format(this.publishables)

    if (publishables == '') {
      console.error('Nothing found')
      process.exit(1)
    }

    console.log(publishables)
  }

  public format(items: string[]) {
    return items.reduce((a, file) => {
      const ext = dirname(dirname(file)).replace(
        'node_modules/',
        '',
      )

      const template = file
        .replace(`${ext}/publish/`, '')
        .replace('node_modules/', '')

      return `${a} \n ◦ ${chalk.blue(ext)} ${chalk.green(
        template,
      )}`
    }, ``)
  }

  public get publishables() {
    return [
      ...globby
        .sync([
          '**/node_modules/bud-*/publish/*',
          '**/node_modules/*/bud-*/publish/*',
        ])
        .filter(
          (value, index, self) => self.indexOf(value) === index,
        ),
    ]
  }
}
