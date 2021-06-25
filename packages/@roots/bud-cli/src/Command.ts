import Base from '@oclif/command'
import {Bud, Framework, services, config} from '@roots/bud'

abstract class Command extends Base {
  public app: Framework

  public async init() {
    this.app = new Bud(config).bootstrap(services).lifecycle()
  }
}

export default Command
