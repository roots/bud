import {formatted} from './util'

export const command = `publish:list`

export const describe = `List available publishable files.`

export const builder = yargs =>
  yargs.usage(`List available templates`)

export const handler = () => {
  console.log(`Available templates`)

  console.log(formatted)

  console.log()
}
