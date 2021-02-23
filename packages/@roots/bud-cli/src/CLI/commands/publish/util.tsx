import {chalk, globby} from '@roots/bud-support'
import {dirname} from 'path'

/**
 * Publishable matches (glob pattern)
 */
export const publishables = [
  ...globby
    .sync([
      '**/node_modules/bud-*/publish/*',
      '**/node_modules/*/bud-*/publish/*',
    ])
    .filter(
      (value, index, self) => self.indexOf(value) === index,
    ),
]

export const formatted = publishables.reduce((a, file) => {
  const ext = dirname(dirname(file)).replace('node_modules/', '')

  const template = file
    .replace(`${ext}/publish/`, '')
    .replace('node_modules/', '')

  return `${a} \n${chalk.blue(ext)} ${chalk.green(template)}`
}, ``)
