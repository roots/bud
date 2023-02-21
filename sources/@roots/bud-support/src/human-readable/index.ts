import * as hr from 'human-readable'

export const durationFormatter = hr.durationFormatter({
  allowMultiples: [`d`, `h`, `m`, `s`, `ms`],
})
export const sizeFormatter = hr.sizeFormatter()

export const duration = (ms: number) => durationFormatter(ms)
export const size = (bytes: number) => sizeFormatter(bytes)
