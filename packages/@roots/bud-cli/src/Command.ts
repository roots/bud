import Base from '@oclif/command'
import {Bud, Framework, services, config} from '@roots/bud'

abstract class Command extends Base {
  public abstract app: Framework

  public features: {
    [key: string]: any
  }

  public async init() {
    this.app = new Bud(Bud, config)
      .bootstrap(services)
      .lifecycle()

    return
  }
}

export default Command
