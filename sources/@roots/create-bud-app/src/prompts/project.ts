import Form from 'enquirer/lib/prompts/form.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Form({
    message: `Project details`,
    choices: [
      {
        name: `name`,
        message: `Project name`,
        initial: command.name,
      },
      {
        name: `username`,
        message: `Github user name`,
        initial: command.username,
      },
      {
        name: `license`,
        message: `License`,
        initial: command.license,
      },
    ],
  })
