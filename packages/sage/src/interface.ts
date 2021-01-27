import {Bud} from '@roots/bud'

declare interface Sage extends Bud {}

declare namespace Sage {
  interface Config {
    entrypoints: {
      [key: string]: string[]
    }
  }
}

export {Sage}
