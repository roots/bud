import Clean from '../../Clean'

export default class All extends Clean {
  public static id: string = 'Clean All'

  public static title: string | undefined = 'Clean All'

  public static description = 'Clean all'

  public static examples = [`$ bud clean:all`]

  public static target: Clean['target'] = ['all']
}
