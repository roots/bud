import {expect} from 'vitest'

export default (code: string) => {
  expect(code.match(/    /)).toBeFalsy()
  expect(code.match(/\\n/)).toBeFalsy()
}
