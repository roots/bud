import {createRequire} from 'node:module'

import {beforeEach, describe, expect, it, vi} from 'vitest'

const mockJetpack = function () {
  return {
    createReadStream: vi.fn(() => this),
    createWriteStream: vi.fn(() => this),
    existsAsync: vi.fn(() => this),
    readAsync: vi.fn(async () => `{"foo":"bar"}`),
    removeAsync: vi.fn(() => this),
    writeAsync: vi.fn(() => this),
    appendAsync: vi.fn(() => this),
    copyAsync: vi.fn(() => this),
    moveAsync: vi.fn(() => this),
    inspectAsync: vi.fn(() => this),
    inspectTreeAsync: vi.fn(() => this),
    listAsync: vi.fn(() => this),
    findAsync: vi.fn(() => this),
    dirAsync: vi.fn(() => this),
    path: vi.fn(() => this),
    cwd: vi.fn(() => this),
  }
}

mockJetpack.cwd = vi.fn(() => mockJetpack)

vi.mock(`fs-jetpack`, () => mockJetpack())

describe(`filesystem`, () => {
  describe(`read`, () => {
    let jetpack
    let json

    beforeEach(async () => {
      jetpack = await import(`fs-jetpack`)
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
      jetpack = await import(`fs-jetpack`)
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
