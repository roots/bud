import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.watch', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  beforeEach(() => {
    bud.extensions.setStore({})
  })

  it('is a function', () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it("doesn't throw when called in production", () => {
    expect(bud.watch(['**/*.js'])).toBeInstanceOf(Framework)
  })

  it('sets watch files', () => {
    bud = setupBud('development')

    const value = ['**/*.js']
    bud.watch(value)

    expect(bud.server.config.get('watch.files')).toBe(value)
  })

  it('sets watch options', () => {
    bud = setupBud('development')

    const files = ['**/*.js']
    const options = {cwd: process.cwd()}
    bud.watch(files, options)

    expect(bud.server.config.get('watch.options')).toBe(options)
  })
})
