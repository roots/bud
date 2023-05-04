import Confirm from 'enquirer/lib/prompts/confirm.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Confirm({
    message: `Do you want to create a starter config (bud.config.ts)?`,
    initial: command.config,
  })
