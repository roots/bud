import {createRequire} from 'node:module'

import {describe, jest} from '@jest/globals'

const mockJetpack = {
  createReadStream: jest.fn(),
  createWriteStream: jest.fn(),
  existsAsync: jest.fn(),
  readAsync: jest.fn(async () => `{"foo":"bar"}`),
  removeAsync: jest.fn(),
  writeAsync: jest.fn(),
  appendAsync: jest.fn(),
  copyAsync: jest.fn(),
  moveAsync: jest.fn(),
  inspectAsync: jest.fn(),
  inspectTreeAsync: jest.fn(),
  listAsync: jest.fn(),
  findAsync: jest.fn(),
  dirAsync: jest.fn(),
  path: jest.fn(),
  cwd: null,
}

const require = createRequire(import.meta.url)

mockJetpack.cwd = jest.fn(() => mockJetpack)

jest.mock(`fs-jetpack`, () => mockJetpack)

describe(`filesystem`, () => {
  describe(`read`, () => {
    let jetpack
    let json

    beforeEach(async () => {
      jetpack = require(`fs-jetpack`)
      json = await import(`./json.js`)
    })

    it(`reads a file`, async () => {
      await json.read(`foo.json`)
      expect(jetpack.readAsync).toHaveBeenCalledWith(`foo.json`, `utf8`)
    })
  })

  describe(`write`, () => {
    let jetpack
    let json

    beforeEach(async () => {
      jetpack = require(`fs-jetpack`)
      json = await import(`./json.js`)
    })

    it(`writes a file`, async () => {
      await json.write(`foo.json`, {foo: `bar`})
      expect(jetpack.writeAsync).toHaveBeenCalledWith(
        `foo.json`,
        `{foo:'bar'}`,
      )
    })
  })
})
