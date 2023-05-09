/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  wordpress: {name: `wordpress`, value: `@roots/bud-preset-wordpress`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `env-support`,
    message: `Add support for runtime environments`,
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
