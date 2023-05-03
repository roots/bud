/* eslint-disable no-console */
// @ts-ignore
import Select from 'enquirer/lib/prompts/select.js'

import {set} from '../state.js'

const prompt = new Select({
  name: `pacman`,
  message: `Which package manager do you use?`,
  choices: [
    {name: `yarn`, value: `yarn`},
    {name: `npm`, value: `npm`},
  ],
})

export const run = async () => {
  try {
    set(`pacman`, await prompt.run())
    console.log(`Set package manager to ${prompt.value}`)
  } catch (error) {
    throw new Error()
  }
}
