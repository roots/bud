import {instance} from '../instance'
import {Container} from '../Container'

export class Arrayed extends Container {
  public repository: Container.ArrayedRepository

  public constructor(repo?: Container.ArrayedRepository) {
    super(repo ?? [])

    return instance.bind(this)()
  }

  public add: Container.Using = function (item: any): void {
    this.repository.push(item)
  }
}
