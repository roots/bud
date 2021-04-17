import {Container} from '@roots/container'
import {Service} from '@roots/bud-typings'
import {Framework} from '../'

export class Services extends Container {
  constructor(
    repository: Container['repository'],
    app: Framework,
  ) {
    super(repository)

    this.mutateStoreEntries(
      (name: string, Instance: Service.Constructor) => {
        return new Instance(app.get)
      },
    )
  }
}
