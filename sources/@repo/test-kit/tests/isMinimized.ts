import {expect} from 'vitest'

export default (code: unknown) => {
  if (typeof code !== `string`) {
    throw new Error(`Expected a string, but got ${typeof code}`)
  }
  expect(code.match(/    /)).toBeFalsy()
  expect(code.match(/\\n/)).toBeFalsy()
}
