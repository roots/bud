import Build from '../../Build'

/**
 * $ bud dev
 *
 * @public
 */
export default class Dev extends Build {
  /**
   * Command description
   *
   * @public
   */
  public static description = 'Compile dev assets'

  /**
   * Command examples
   *
   * @public
   */
  public static examples = [`$ bud build:dev [name]`]

  /**
   * Command aliases
   *
   * @public
   */
  public static aliases = ['dev', 'start', 'build:development']

  /**
   * Command mode
   *
   * @public
   */
  public mode: 'development' | 'production' = 'development'
}
