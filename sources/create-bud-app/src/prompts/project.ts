import Form from 'enquirer/lib/prompts/form.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Form({
    choices: [
      {
        initial: command.name,
        message: `Project name`,
        name: `name`,
      },
      {
        initial: command.description,
        message: `Project description`,
        name: `description`,
      },
      {
        initial: command.username,
        message: `Github user name`,
        name: `username`,
      },
      {
        initial: command.license,
        message: `Project license`,
        name: `license`,
      },
    ],
    message: `Provide project details`,
  })
