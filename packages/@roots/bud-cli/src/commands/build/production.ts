import {BaseBuild} from '../../Build'

export default class Build extends BaseBuild {
  public static description = 'Compile production assets'
  public static examples = [`$ bud build:production`]
  public mode: 'development' | 'production' = 'production'
}
