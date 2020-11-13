import type {
  Bud,
  Build,
  Extension,
  Item,
  Rule,
} from '@roots/bud-typings'

export const loaders = function (this: Bud.Contract): void {
  this.registered
    .use('loaders')
    .asEntries()
    .forEach((args: [string, Build.Loader]) => {
      this.build.setLoader(...args)
    })
}

export const items = function (this: Bud.Contract): void {
  this.registered
    .use('items')
    .asEntries()
    .forEach((args: [string, Item.Module]) => {
      this.build.setItem(...args)
    })
}

export const rules = function (this: Bud.Contract): void {
  this.registered
    .use('rules')
    .asEntries()
    .forEach((args: [string, Rule.Module]) => {
      this.build.setRule(...args)
    })
}

export const extensions = function (this: Bud.Contract): void {
  this.registered
    .use('extensions')
    .asEntries()
    .forEach((args: [string, Extension.Contract]) => {
      this.extensions.set(...args)
    })
}
