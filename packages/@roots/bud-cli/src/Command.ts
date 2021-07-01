import Base from '@oclif/command'
import {Notifier} from './Notifier'

abstract class Command extends Base {
  public notifier: Notifier

  public async init() {
    this.notifier = new Notifier()
  }
}

export default Command
