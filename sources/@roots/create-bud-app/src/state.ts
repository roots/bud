interface data {
  name: string
  username: string
  config: boolean
  directory: string
  license: string
  pacman: string
  package: string
  transpilers: Array<string>
}

export const data: data = {
  name: ``,
  username: ``,
  license: ``,
  directory: ``,
  config: null,
  pacman: ``,
  package: ``,
  transpilers: [],
}

export const get = <K extends `${keyof data & string}`>(key: K): data[K] =>
  data[key]

export const set = <K extends `${keyof data & string}`>(
  key: K,
  value: data[K],
) => (data[key] = value)
