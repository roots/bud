import {expect} from 'vitest'

export default (js: string) => {
  expect(js.length).toBeGreaterThan(1)
  expect(() => new Function(js)).not.toThrow()
  expect(js.match(/\simport\s/)).toBeFalsy()
  expect(js.match(/\srequire\(/)).toBeFalsy()
  expect(js.match(/module\.exports/)).toBeFalsy()
  expect(js.match(/import\.meta\.hot/)).toBeFalsy()
  expect(js.match(/process\./)).toBeFalsy()
}
