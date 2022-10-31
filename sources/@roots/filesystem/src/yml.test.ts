import {createRequire} from 'node:module'

import {beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock(`fs-jetpack`, function () {
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
})

describe(`yml`, () => {
  describe(`read`, () => {
    let jetpack
    let yml

    beforeEach(async () => {
      jetpack = await import(`fs-jetpack`)
      yml = await import(`./yml.js`)
    })

    it(`reads a file`, async () => {
      await yml.read(`foo.yml`)
      expect(jetpack.readAsync).toHaveBeenCalledWith(`foo.yml`, `utf8`)
    })
  })

  describe(`write`, () => {
    let jetpack
    let yml

    beforeEach(async () => {
      jetpack = await import(`fs-jetpack`)
      yml = await import(`./yml.js`)
    })

    it(`writes a file`, async () => {
      const writeAsyncSpy = vi.spyOn(jetpack, `writeAsync`)
      await yml.write(`foo.yml`, {foo: `bar`})
      expect(writeAsyncSpy).toHaveBeenCalledWith(`foo.yml`, `foo: bar\n`)
    })
  })
})
