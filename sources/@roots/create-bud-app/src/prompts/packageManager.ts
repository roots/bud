/* eslint-disable no-console */
// @ts-ignore
import Select from 'enquirer/lib/prompts/select.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  npm: {name: `npm`, value: `npm`},
  yarn: {name: `yarn`, value: `yarn`},
}

export default (command: CreateCommand) =>
  new Select({
    name: `packageManager`,
    message: `Which package manager do you want to use?`,
    choices: Object.values(choices),
    initial: command.packageManager,
  })
