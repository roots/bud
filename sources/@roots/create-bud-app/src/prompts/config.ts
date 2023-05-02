import Confirm from 'enquirer/lib/prompts/confirm.js'

import {set} from '../state.js'

const config = new Confirm({
  message: `Do you want to create a starter config (bud.config.ts)?`,
})

export const run = async () => {
  try {
    set(`config`, await config.run())
  } catch (error) {
    throw new Error(error)
  }
}
