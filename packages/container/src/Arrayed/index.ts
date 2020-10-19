import {Base, Container} from '../Base'

export class Arrayed extends Base {
  public repository: Container.ArrayedRepository

  public constructor(repo?: Container.ArrayedRepository) {
    super(repo ?? [])
  }

  public add: Container.Using = function (item: any): void {
    this.repository.push(item)
  }
}
