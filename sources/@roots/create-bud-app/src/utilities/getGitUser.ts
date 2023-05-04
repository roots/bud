import {execa} from 'execa'

import type CreateCommand from '../commands/create.js'

export default async function getGitUser(command: CreateCommand) {
  const result = await execa(`gh`, [`auth`, `status`])
  const stdio = result.stdout.concat(result.stderr)

  if (stdio) {
    try {
      const [, match] = stdio.split(`\n`)[1].match(/as (.*) /)
      return match
    } catch (err) {
      // fallthrough
    }

    return undefined
  }

  return undefined
}
