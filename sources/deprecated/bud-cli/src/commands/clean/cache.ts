import Clean from '../../Clean'

export default class Cache extends Clean {
  public static description = 'Clean cache directory'
  public static examples = [`$ bud build:cache`]
  public target: Clean['target'] = ['storage', 'cache']
}
