import type {OptionsMap} from '../index.js'

export const options =
  <Options = any>(options: OptionsMap<Options>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.optionsMap = options
      }
    }
