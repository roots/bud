import {Base, Container} from '../Base'
import {instance} from '../instance'

export class Arrayed extends Base {
  public repository: Container.ArrayedRepository

  public constructor(repo?: Container.ArrayedRepository) {
    super(repo ?? [])

    return instance.bind(this)()
  }

  public add: Container.Using = function (item: any): void {
    this.repository.push(item)
  }
}
