import {BaseBuild} from '../../Build'

export default class Build extends BaseBuild {
  public static description = 'Compile dev assets'
  public static examples = [`$ bud build:dev`]
  public mode: 'development' | 'production' = 'development'
}
