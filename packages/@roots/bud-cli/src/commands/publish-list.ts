import {formatted} from '../util'
import Command from '../Command'

/**
 * Publish
 */
export default class PublishList extends Command {
  public name = 'publish:list'

  public description = 'List available publishable files.'

  public action() {
    if (formatted == '') {
      console.log('Nothing found')
      process.exit(1)
    }

    console.log('Available templates')
    console.log(formatted)
    console.log('')
  }
}
