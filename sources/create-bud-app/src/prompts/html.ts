/* eslint-disable no-console */
// @ts-ignore
import Toggle from 'enquirer/lib/prompts/toggle.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Toggle({
    initial: command.html,
    message: `Generate HTML wrapper for your application`,
    name: `html`,
  })
