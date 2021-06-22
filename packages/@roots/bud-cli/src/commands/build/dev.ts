import Build from '../../Build'

export default class Dev extends Build {
  public static description = 'Compile dev assets'
  public static examples = [`$ bud build:dev [name]`]
  public static aliases = ['dev', 'start', 'build:development']
  public mode: 'development' | 'production' = 'development'
}
