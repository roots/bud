import Base from '@oclif/command'
import {Bud, services, config} from '@roots/bud'

export default abstract class Command extends Base {
  public abstract app: Bud

  public async init() {
    this.app = new Bud(config).bootstrap(services).lifecycle()
  }
}
