export type Hooks = {
  registered: RegisteredHooks
  make: Function
  getAll: () => any[]
  on: (name: string, callback: Function) => void
  call: (name: string, params: any) => void
}

export type RegisteredHooks = {
  [name: string]: Hook[]
}

export type Hook = {
  fn: () => any,
  fired: boolean,
}
