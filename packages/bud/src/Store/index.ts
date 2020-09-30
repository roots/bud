import Container, {Loose} from '@roots/container'

export default class Store {
  [key: string]: any
  state: any

  public constructor(repo: Loose) {
    this.state = new Container()

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.create = this.create.bind(this)

    repo &&
      Object.entries(repo).forEach(([key, val]) => {
        this.create(key, val)
      })
  }

  public create(name: string, state: Loose): Container {
    this.state[name] = new Container(state)

    Object.defineProperty(this, name, {
      get: () => this.state[name],
      set: val => {
        this.state['name'] = val
      },
    })

    return this.use(name)
  }

  public query(stores: string[]): Container[] {
    return stores.map(store => this[store])
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
