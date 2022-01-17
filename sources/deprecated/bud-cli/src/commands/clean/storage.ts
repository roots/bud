import Clean from '../../Clean'

export default class Storage extends Clean {
  public static description = 'Compile storage directory'
  public static examples = [`$ bud build:storage`]
  public target: Clean['target'] = ['storage']
}
