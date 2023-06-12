import type {
  SignaleBase as Base,
  CommandType as Command,
  SignaleConfig as Config,
  SignaleConstructor as Constructor,
  LoggerFunc as Fn,
  Signale as Instance,
  DefaultMethods as Methods,
  SignaleOptions as Options,
} from 'signale'

import {default as SignaleModule} from 'signale'

const Signale = SignaleModule.Signale
export {Signale as default}

export type {
  Base,
  Command,
  Config,
  Constructor,
  Fn,
  Instance,
  Methods,
  Options,
}
