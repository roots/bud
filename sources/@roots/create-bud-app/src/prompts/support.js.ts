/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  swc: {name: `swc`, value: `@roots/bud-swc`},
  babel: {name: `babel`, value: `@roots/bud-babel`},
  typescript: {name: `typescript`, value: `@roots/bud-typescript`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `transpiler`,
    message: `Add transpiler support`,
    choices: Object.values(choices),
    initial: command.support.filter(s => choices[s]),
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
