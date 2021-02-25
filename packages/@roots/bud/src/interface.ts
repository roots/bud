import '@roots/bud-api'
import '@roots/bud-framework'
import {Providers} from '@roots/bud-typings'

export declare type Provider = [
  Providers.Constructor,
  Providers.Options?,
]

export declare interface Providers {
  [key: string]: Provider
}
