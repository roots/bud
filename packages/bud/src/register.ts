import {Bud, Index} from '@roots/bud-typings'

export const containers = function (this: Bud.Contract): void {
  this.registered
    .use('containers')
    .asEntries()
    .forEach(([name, repo]: [string, Index<unknown>]) => {
      Object.assign(this, {
        [name]: this.makeContainer(repo),
      })
    })
}

export const services = function (this: Bud.Contract): void {
  this.registered
    .use('services')
    .asEntries()
    .forEach(([, method]: [string, CallableFunction]) => {
      method.bind(this)()
    })
}

export const callables = function (this: Bud.Contract): void {
  this.registered
    .use('api')
    .asEntries()
    .forEach(([name, method]: [string, CallableFunction]) => {
      Object.assign(this, {[name]: method.bind(this)})
    })
}
