/* eslint-disable no-console */
// @ts-ignore
import Select from 'enquirer/lib/prompts/select.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  npm: {name: `npm`, value: `npm`},
  // eslint-disable-next-line perfectionist/sort-objects
  [`yarn-classic`]: {name: `yarn classic`, value: `yarn classic`},
  pnpm: {name: `pnpm (experimental)`, value: `pnpm`},
  yarn: {name: `yarn (experimental)`, value: `yarn`},
}

export default (command: CreateCommand) =>
  new Select({
    choices: Object.values(choices),
    initial: command.packageManager,
    message: `Select a package manager`,
    name: `packageManager`,
  })
