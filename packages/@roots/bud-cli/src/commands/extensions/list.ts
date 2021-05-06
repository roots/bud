import Command from '../../Command'
import {Bud} from '@roots/bud'

export default class Install extends Command {
  public app: Bud

  public static description = 'List installed extensions.'

  public static examples = ['$ bud extensions:list']

  public async run() {
    console.log('Installed extensions')

    this.app.discovery.getValues('peers').forEach(item => {
      console.log(`- ${item.name}`)
    })
  }
}
