/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  babel: {name: `babel`, value: `@roots/bud-babel`},
  swc: {name: `swc`, value: `@roots/bud-swc`},
  typescript: {name: `typescript`, value: `@roots/bud-typescript`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    choices: Object.values(choices),
    initial: command.support.filter(s => choices[s]),
    message: `Add js compiler support`,
    name: `compiler`,
    result(
      this: typeof MultiSelect,
      answer: Array<Record<string, string>>,
    ) {
      return Object.keys(this.map(answer)).reduce(
        (all, support) => [...all, support],
        [],
      )
    },
  })
