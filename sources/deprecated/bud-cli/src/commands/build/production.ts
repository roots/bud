import Build from '../../Build'

export default class Production extends Build {
  public static description = 'Compile production assets'
  public static examples = [`$ bud build:production [name]`]
  public static aliases = [
    'build',
    'build:production',
    'production',
  ]
  public mode: 'development' | 'production' = 'production'
}
