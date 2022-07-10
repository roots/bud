import type {Signale} from 'signale'

export declare const make: (options?, config?) => Signale
export declare const logger: Signale
export declare const log: Signale['log']
export declare const error: Signale['error']
export declare const debug: Signale['debug']
export declare const info: Signale['info']
export declare const warn: Signale['warn']
export declare const success: Signale['success']
