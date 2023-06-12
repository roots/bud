import {durationFormatter, sizeFormatter} from 'human-readable'

export * from 'human-readable'

export const duration = durationFormatter({
  allowMultiples: [`d`, `h`, `m`, `s`, `ms`],
})
export const size = sizeFormatter()
