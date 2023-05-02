/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import {set} from '../state.js'

const prompt = new MultiSelect({
  name: `transpiler`,
  message: `Add support for one or more transpilers`,
  choices: [
    {name: `swc (recommended)`, value: `@roots/bud-swc`},
    {name: `typescript`, value: `@roots/bud-typescript`},
    {name: `babel`, value: `@roots/bud-babel`},
    {name: `postcss`, value: `@roots/bud-postcss`},
    {name: `sass`, value: `@roots/bud-sass`},
  ],
  result(answer: Array<Record<string, string>>) {
    return Object.entries(this.map(answer)).reduce(
      (all, [name, value]) => [...all, {name, value}],
      [],
    )
  },
})

export const run = async () => {
  try {
    set(`transpilers`, await prompt.run())
  } catch (error) {
    throw new Error()
  }
}
