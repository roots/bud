import {Options as Opt} from '../types'

export const options =
  <Options = any>(options: Opt.Seed<Options>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this._options = options
      }
    }
