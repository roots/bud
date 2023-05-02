interface data {
  config: boolean
  package: string
  transpilers: Array<string>
}

export const data: data = {
  config: null,
  package: ``,
  transpilers: [],
}

export const get = <K extends `${keyof data & string}`>(key: K): data[K] =>
  data[key]

export const set = <K extends `${keyof data & string}`>(
  key: K,
  value: data[K],
) => (data[key] = value)
