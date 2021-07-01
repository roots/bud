import Clean from '../../Clean'

export default class All extends Clean {
  public static description = 'Clean all'
  public static examples = [`$ bud clean:all`]
  public target: Clean['target'] = ['all']
}
