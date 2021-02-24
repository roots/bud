import {Error} from '@roots/bud-dashboard'
import {commands} from '@roots/bud-cli'
import * as source from './source'

export const command = commands.build.command

export const describe = commands.build.describe

export const builder = commands.build.builder

export const handler = () => {
  try {
    source.preflight()
    source.isStatic() ? source.json() : source.api()
  } catch (error) {
    Error(error.toString(), `Error`)
  }
}
