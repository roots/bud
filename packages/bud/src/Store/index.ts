import Container, {Loose} from '@roots/container'

export default class Store {
  state: Container

  public constructor() {
    this.state = new Container()

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.create = this.create.bind(this)
  }

  public create(name: string, state: Loose): Container {
    this.state[name] = new Container(state)

    return this.use(name)
  }

  public use(name: string): Container {
    return this.state[name]
  }

  public get(name: string, query: string): unknown {
    return this.use(name).get(query)
  }

  public set(name: string, key: string, value: unknown): void {
    this.use(name).set(key, value)
  }
}
