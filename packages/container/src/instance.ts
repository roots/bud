import type {Container} from './Base'
import {Indexed} from './Indexed'
import {Arrayed} from './Arrayed'

export function instance(
  this: Container.Base | Container.Indexed | Container.Arrayed,
): Container.Base | Container.Indexed | Container.Arrayed {
  return new Proxy(this, {
    get(target, prop) {
      if (
        prop == 'repository' &&
        !(target instanceof Indexed || target instanceof Arrayed)
      ) {
        console.error(
          'Do not modify the container repository directly. Use one of the following methods: `container.all`, `container.entries`, `container.keys`, `container.values`, `container.Map`',
        )

        throw new Error()
      }

      return target[prop]
    },
    ownKeys(target) {
      return Object.keys(target).filter(
        key => key === 'repository',
      )
    },
  })
}
