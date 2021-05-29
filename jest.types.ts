import {Signale} from 'signale'

declare global {
  let log: Signale['log']
  let error: Signale['error']
  let succss: Signale['success']
}
