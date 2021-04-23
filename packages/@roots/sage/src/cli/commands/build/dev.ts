import {BaseBuild} from '../../Build'

export default class Build extends BaseBuild {
  public static description = 'Compile dev assets'
  public static examples = [`$ sage build:dev`]
  public mode: 'development' | 'production' = 'development'
}
