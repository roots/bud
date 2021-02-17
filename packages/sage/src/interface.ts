import {Bud} from '@roots/bud'
import {Framework} from '@roots/bud-framework'
import '@roots/bud-api'

declare interface Sage extends Bud {}

declare namespace Sage {
  interface Config {
    entrypoints: Framework.Api.Entry.Obj
  }
}

export {Sage}
