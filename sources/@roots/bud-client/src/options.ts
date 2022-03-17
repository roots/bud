export interface Options {
  name: string
  path: string
  timeout: number
  reload: boolean
  error: boolean
  warn: boolean
  log: boolean
}

const params = new URLSearchParams()

export const options: Options = {
  name: params.has('name') ? params.get('name') : 'bud',
  path: params.has('path') ? params.get('path') : '/__bud/hmr',
  timeout: params.has('timeout')
    ? Number(params.get('timeout'))
    : 20 * 1000,
  reload: params.has('reload') ? params.get('reload') !== 'false' : true,
  log: params.has('log') ? params.get('log') !== 'false' : true,
  warn: params.has('warn') ? params.get('warn') !== 'false' : true,
  error: params.has('error') ? params.get('error') !== 'false' : true,
}
