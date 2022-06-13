import type {Options} from '../index.js'

export const options =
  <Options = any>(options: Options.Seed<Options>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this._options = options
      }
    }
