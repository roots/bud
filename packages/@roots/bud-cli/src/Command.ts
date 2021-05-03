import Base from '@oclif/command'
import {Bud} from '@roots/bud'

export default abstract class Command extends Base {
  public abstract app: Bud
}
