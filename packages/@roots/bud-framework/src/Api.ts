import {Service} from './Service'

/**
 * API service container
 *
 * @public @core @container
 */
export interface Api extends Service {
  trace: Array<[string, ...any[]]>
  queue: Array<[string, ...any[]]>
  call: (name: string, args: any) => Promise<void>
  callAll: () => Promise<void>
}
