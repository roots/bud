/* eslint-disable no-console */
// @ts-ignore
import Select from 'enquirer/lib/prompts/select.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  npm: {name: `npm`, value: `npm`},
  pnpm: {name: `pnpm`, value: `pnpm`},
  yarn: {name: `yarn`, value: `yarn`},
  // eslint-disable-next-line perfectionist/sort-objects
  [`yarn-classic`]: {name: `yarn classic`, value: `yarn classic`},
}

export default (command: CreateCommand) =>
  new Select({
    choices: Object.values(choices),
    initial: command.packageManager,
    message: `Select a package manager`,
    name: `packageManager`,
  })
