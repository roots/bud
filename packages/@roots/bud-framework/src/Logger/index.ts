import {Signale} from 'signale'

export interface Logger {
  name: string | number

  instance: Signale

  makeLogger: (props?: {
    scope?: any
    options?: any
    config?: any
  }) => void
}
