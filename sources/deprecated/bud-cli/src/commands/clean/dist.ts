import Clean from '../../Clean'

export default class Dist extends Clean {
  public static description = 'Clean dist directory'
  public static examples = [`$ bud clean:dist`]
  public target: Clean['target'] = ['dist']
}
