import Bud from '../Bud'

import Container from '@roots/container'

class Store implements Bud.Store {
  state: Container

  public constructor(repo?: Bud.Store.Constructor) {
    this.state = new Container()

    this.create = this.create.bind(this)

    repo &&
      Object.entries(repo).forEach(([key, val]) => {
        this.create(key, val)
      })
  }

  public create: Bud.Store.Create = function (name, state) {
    this.state[name] = new Container(state)

    Object.defineProperty(this, name, {
      get: () => {
        return this.state[name].all()
      },
    })

    return this.use(name)
  }

  public get: Bud.Store.Get = function (name, query) {
    return this.use(name).get(query)
  }

  public set: Bud.Store.Set = function (name, query, val) {
    return this.use(name).set(query, val)
  }

  public merge: Bud.Store.Merge = function (name, state) {
    return (this[name].repository = {
      ...this[name].repository,
      ...state,
    })
  }

  public query: Bud.Store.Query = function (stores) {
    return stores.map(store => this.state[store])
  }

  public use: Bud.Store.Use = function (name: string) {
    return this.state[name]
  }
}

export default Store
