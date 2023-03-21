import {beforeEach, describe, expect, it, vi} from 'vitest'

import {FS} from './index.js'

vi.mock(`fs-jetpack`, function () {
  return {
    default: {
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
    },
  }
})

describe(`filesystem`, () => {
  let fs
  let jetpack
  let json

  beforeEach(async () => {
    vi.clearAllMocks()
    jetpack = {
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
    json = await import(`./json`).then(mock => {
      json = mock
    })

    fs = new FS()
    fs.fs = jetpack
    fs.json = {
      read: vi.fn(),
      write: vi.fn(),
      stringify: vi.fn(),
      parse: vi.fn(),
    }
  })

  it(`should call jetpack createWriteStream`, async () => {
    await fs.createWriteStream(`foo`)
    expect(jetpack.createWriteStream).toHaveBeenCalledWith(
      `foo`,
      undefined,
    )
  })

  it(`should call jetpack createReadStream`, async () => {
    await fs.createReadStream(`foo`)
    expect(jetpack.createReadStream).toHaveBeenCalledWith(`foo`, undefined)
  })

  it(`should call jetpack exists`, async () => {
    await fs.exists(`foo`)
    expect(jetpack.existsAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack read`, async () => {
    await fs.read(`foo`)
    expect(jetpack.readAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack remove`, async () => {
    await fs.remove(`foo`)
    expect(jetpack.removeAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack write`, async () => {
    await fs.write(`foo`, `bar`)
    expect(jetpack.writeAsync).toHaveBeenCalledWith(`foo`, `bar`, {})
  })

  it(`should call jetpack write with options`, async () => {
    await fs.write(`foo`, `bar`, {mode: `777`})
    expect(jetpack.writeAsync).toHaveBeenCalledWith(`foo`, `bar`, {
      mode: `777`,
    })
  })

  it(`should call jetpack append`, async () => {
    await fs.append(`foo`, `bar`)
    expect(jetpack.appendAsync).toHaveBeenCalledWith(
      `foo`,
      `bar`,
      undefined,
    )
  })

  it(`should call jetpack copy`, async () => {
    await fs.copy(`foo`, `bar`)
    expect(jetpack.copyAsync).toHaveBeenCalledWith(`foo`, `bar`, undefined)
  })

  it(`should call jetpack move`, async () => {
    await fs.move(`foo`, `bar`)
    expect(jetpack.moveAsync).toHaveBeenCalledWith(`foo`, `bar`, undefined)
  })

  it(`should call jetpack inspect`, async () => {
    await fs.inspect(`foo`)
    expect(jetpack.inspectAsync).toHaveBeenCalledWith(`foo`, undefined)
  })

  it(`should call jetpack inspectTree`, async () => {
    await fs.inspectTree(`foo`)
    expect(jetpack.inspectTreeAsync).toHaveBeenCalledWith(`foo`, undefined)
  })

  it(`should call jetpack list`, async () => {
    await fs.list(`foo`)
    expect(jetpack.listAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack find`, async () => {
    await fs.find(`foo`)
    expect(jetpack.findAsync).toHaveBeenCalledWith({matching: `foo`})
  })

  it(`should call jetpack dir`, async () => {
    await fs.dir(`foo`)
    expect(jetpack.dirAsync).toHaveBeenCalledWith(`foo`, undefined)
  })
})
