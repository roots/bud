/* eslint-disable no-console */
// @ts-ignore
import Toggle from 'enquirer/lib/prompts/toggle.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Toggle({
    initial: false,
    message: `Confirm usage in existing directory`,
    name: `confirm-existing`,
  })
