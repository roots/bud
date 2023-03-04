export type Fn = (...args: any[]) => any

export type Filter = {
  [key: string]: Fn
}

export type Registry = {
  [key: string]: Filter
}
