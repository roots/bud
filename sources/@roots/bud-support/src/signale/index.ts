// @ts-nocheck
import type {
  CommandType as Command,
  DefaultMethods as Methods,
  LoggerFunc as Fn,
  Signale as Instance,
  SignaleBase as Base,
  SignaleConfig as Config,
  SignaleConstructor as Constructor,
  SignaleOptions as Options,
} from 'signale'
import * as SignaleModule from 'signale'

const Signale = SignaleModule.default.Signale
export {Signale as default}

export type {
  Methods,
  Fn,
  Command,
  Base,
  Config,
  Constructor,
  Options,
  Instance,
}
