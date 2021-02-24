import {formatted} from './util'
import {Argv} from 'yargs'

export const command = `publish:list`

export const describe = `List available publishable files.`

export const builder = (yargs: Argv) =>
  yargs.usage('List available templates')

export const handler = () => {
  console.log('Available templates')

  console.log(formatted)

  console.log('')
}
