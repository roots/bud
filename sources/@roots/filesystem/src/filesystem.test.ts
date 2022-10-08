import {describe, jest} from '@jest/globals'

import {FS} from './index'

const mockJetpack = {
  createReadStream: jest.fn(),
  createWriteStream: jest.fn(),
  existsAsync: jest.fn(),
  readAsync: jest.fn(),
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

mockJetpack.cwd = jest.fn(() => mockJetpack)

const mockJson = {
  read: jest.fn(),
  write: jest.fn(),
  stringify: jest.fn(),
  parse: jest.fn(),
}

jest.unstable_mockModule(`fs-jetpack`, () => ({default: mockJetpack}))
jest.unstable_mockModule(`./json`, () => mockJson)

describe(`filesystem`, () => {
  let fs
  let jetpack
  let json

  beforeEach(async () => {
    jest.clearAllMocks()
    await import(`fs-jetpack`).then(({default: mock}) => {
      jetpack = mock
    })

    await import(`./json`).then(mock => {
      json = mock
    })

    fs = new FS()
    fs.fs = jetpack
    fs.json = json
  })

  it(`should call jetpack createWriteStream`, async () => {
    await fs.createWriteStream(`foo`)
    expect(mockJetpack.createWriteStream).toHaveBeenCalledWith(
      `foo`,
      undefined,
    )
  })

  it(`should call jetpack createReadStream`, async () => {
    await fs.createReadStream(`foo`)
    expect(mockJetpack.createReadStream).toHaveBeenCalledWith(
      `foo`,
      undefined,
    )
  })

  it(`should call jetpack exists`, async () => {
    await fs.exists(`foo`)
    expect(mockJetpack.existsAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack read`, async () => {
    await fs.read(`foo`)
    expect(mockJetpack.readAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack remove`, async () => {
    await fs.remove(`foo`)
    expect(mockJetpack.removeAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack write`, async () => {
    await fs.write(`foo`, `bar`)
    expect(mockJetpack.writeAsync).toHaveBeenCalledWith(`foo`, `bar`, {})
  })

  it(`should call jetpack write with options`, async () => {
    await fs.write(`foo`, `bar`, {mode: `777`})
    expect(mockJetpack.writeAsync).toHaveBeenCalledWith(`foo`, `bar`, {
      mode: `777`,
    })
  })

  it(`should call jetpack append`, async () => {
    await fs.append(`foo`, `bar`)
    expect(mockJetpack.appendAsync).toHaveBeenCalledWith(
      `foo`,
      `bar`,
      undefined,
    )
  })

  it(`should call jetpack copy`, async () => {
    await fs.copy(`foo`, `bar`)
    expect(mockJetpack.copyAsync).toHaveBeenCalledWith(
      `foo`,
      `bar`,
      undefined,
    )
  })

  it(`should call jetpack move`, async () => {
    await fs.move(`foo`, `bar`)
    expect(mockJetpack.moveAsync).toHaveBeenCalledWith(
      `foo`,
      `bar`,
      undefined,
    )
  })

  it(`should call jetpack inspect`, async () => {
    await fs.inspect(`foo`)
    expect(mockJetpack.inspectAsync).toHaveBeenCalledWith(`foo`, undefined)
  })

  it(`should call jetpack inspectTree`, async () => {
    await fs.inspectTree(`foo`)
    expect(mockJetpack.inspectTreeAsync).toHaveBeenCalledWith(
      `foo`,
      undefined,
    )
  })

  it(`should call jetpack list`, async () => {
    await fs.list(`foo`)
    expect(mockJetpack.listAsync).toHaveBeenCalledWith(`foo`)
  })

  it(`should call jetpack find`, async () => {
    await fs.find(`foo`)
    expect(mockJetpack.findAsync).toHaveBeenCalledWith({matching: `foo`})
  })

  it(`should call jetpack dir`, async () => {
    await fs.dir(`foo`)
    expect(mockJetpack.dirAsync).toHaveBeenCalledWith(`foo`, undefined)
  })

  it(`should call jetpack path`, async () => {
    fs.path(`foo`)
    expect(mockJetpack.path).toHaveBeenCalledWith(`foo`)
  })
})
