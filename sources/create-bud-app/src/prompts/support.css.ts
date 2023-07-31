/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  postcss: {name: `postcss`, value: `@roots/bud-postcss`},
  sass: {name: `sass`, value: `@roots/bud-sass`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    choices: Object.values(choices),
    initial: command.support.filter(s => choices[s]),
    message: `Add css compiler support`,
    name: `css-compiler`,
    result(
      this: typeof MultiSelect,
      answer: Array<Record<string, string>>,
    ) {
      return [...Object.keys(this.map(answer))]
    },
  })
