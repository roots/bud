export interface Payload extends MessageEvent {
  name: string
  action: string
  time: number
  hash: string
  warnings: Array<Record<string, string>>
  errors: Array<Record<string, string>>
  modules: Array<Record<string | number, string>>
}
