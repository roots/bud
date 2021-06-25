import Command from '../../Command'

export default class Install extends Command {
  public static description = 'List installed extensions.'

  public static examples = ['$ bud extensions:list']

  public async run() {
    console.log('Peers')
    console.log('----')

    this.app.discovery.getValues('peers').forEach(item => {
      console.log(`- ${item.name}`)
    })

    console.log('')

    console.log('Requires')
    console.log('----')

    this.app.discovery
      .getValues('required')
      .forEach(({name}) => {
        console.log(`- ${name}`)
      })

    process.exit()
  }
}
