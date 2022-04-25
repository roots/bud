import {bind, lodash as _} from '@roots/bud-support'

import {Bud} from '../bud'
import {Modules} from '../registry'
import {Extension} from './'
import {Options as Opt} from './types'

export const Bind = bind
export {bind}

export const Production = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public when() {
      return this.app.isProduction
    }

    public constructor(...args: any[]) {
      super(...args)
    }
  }
export const production = Production

export const Development = <Type extends {new (...args: any[]): any}>(
  constructor: Type,
) =>
  class extends constructor {
    public when() {
      return this.app.isDevelopment
    }

    public constructor(...args: any[]) {
      super(...args)
    }
  }
export const development = Development

export const DependsOn =
  (dependsOn: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public dependsOn = new Set(dependsOn)
    }
export const dependsOn = DependsOn

export const Expose =
  (propName: `${keyof Bud & string}`) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.app[propName] = this
      }
    }
export const expose = Expose

export const Label =
  (label: string) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public label = label
    }
export const label = Label

export const Plugin =
  (plugin: new (...args: any[]) => {apply: CallableFunction}) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public plugin = plugin
    }
export const plugin = Plugin

export const When =
  (when: Extension['when']) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public when = when.bind(this)
    }

export const when = When

export const Options =
  <Options = any>(options: Opt.Seed<Options>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.options = options
      }
    }

export const options = Options
