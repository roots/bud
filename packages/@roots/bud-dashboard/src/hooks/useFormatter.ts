import {durationFormatter, sizeFormatter} from 'human-readable'

/**
 * Formats filesize and duration
 *
 * @public
 */
export const useFormatter = () => {
  return {
    fileSize: sizeFormatter({
      decimalPlaces: 2,
      keepTrailingZeroes: false,
    }),
    duration: durationFormatter({
      allowMultiples: ['m', 's', 'ms'],
    }),
  }
}
